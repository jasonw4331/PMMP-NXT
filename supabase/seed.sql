--
-- Name: next_auth; Type: SCHEMA;
--
CREATE SCHEMA next_auth;

GRANT USAGE ON SCHEMA next_auth TO service_role;
GRANT ALL ON SCHEMA next_auth TO postgres;

--
-- Create users table
--
CREATE TABLE IF NOT EXISTS next_auth.users
(
    id              uuid NOT NULL DEFAULT uuid_generate_v4(),
    name            text,
    email           text,
    "emailVerified" timestamp with time zone,
    image           text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);

GRANT ALL ON TABLE next_auth.users TO postgres;
GRANT ALL ON TABLE next_auth.users TO service_role;

--- uid() function to be used in RLS policies
CREATE FUNCTION next_auth.uid() RETURNS uuid
    LANGUAGE sql
    STABLE
AS
$$
select coalesce(
               nullif(current_setting('request.jwt.claim.sub', true), ''),
               (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
       )::uuid
$$;

--
-- Create sessions table
--
CREATE TABLE IF NOT EXISTS next_auth.sessions
(
    id             uuid                     NOT NULL DEFAULT uuid_generate_v4(),
    expires        timestamp with time zone NOT NULL,
    "sessionToken" text                     NOT NULL,
    "userId"       uuid,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT sessionToken_unique UNIQUE ("sessionToken"),
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

GRANT ALL ON TABLE next_auth.sessions TO postgres;
GRANT ALL ON TABLE next_auth.sessions TO service_role;

--
-- Create accounts table
--
CREATE TABLE IF NOT EXISTS next_auth.accounts
(
    id                  uuid NOT NULL DEFAULT uuid_generate_v4(),
    type                text NOT NULL,
    provider            text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token       text,
    access_token        text,
    expires_at          bigint,
    token_type          text,
    scope               text,
    id_token            text,
    session_state       text,
    oauth_token_secret  text,
    oauth_token         text,
    "userId"            uuid,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT provider_unique UNIQUE (provider, "providerAccountId"),
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

GRANT ALL ON TABLE next_auth.accounts TO postgres;
GRANT ALL ON TABLE next_auth.accounts TO service_role;

--
-- Create verification_tokens table
--
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens
(
    identifier text,
    token      text,
    expires    timestamp with time zone NOT NULL,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token),
    CONSTRAINT token_unique UNIQUE (token),
    CONSTRAINT token_identifier_unique UNIQUE (token, identifier)
);

GRANT ALL ON TABLE next_auth.verification_tokens TO postgres;
GRANT ALL ON TABLE next_auth.verification_tokens TO service_role;

-- Note: This table contains user data. Users should only be able to view and update their own data.
create table public.users
(
    -- UUID from next_auth.users
    id    uuid not null primary key,
    name  text,
    email text,
    image text,
    constraint "users_id_fkey" foreign key ("id")
        references next_auth.users (id) match simple
        on update no action
        on delete cascade -- if a user is deleted in NextAuth they will also be deleted in our public table.
);
alter table public.users
    enable row level security;
create policy "Can view own user data." on public.users for select using (next_auth.uid() = id);
create policy "Can update own user data." on public.users for update using (next_auth.uid() = id);

-- This trigger automatically creates a user entry when a new user signs up via NextAuth.
create function public.handle_new_user()
    returns trigger as
$$
begin
    insert into public.users (id, name, email, image)
    values (new.id, new.name, new.email, new.image);
    return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
    after insert
    on next_auth.users
    for each row
execute procedure public.handle_new_user();

-- Ensure only necessary data is collected and used
