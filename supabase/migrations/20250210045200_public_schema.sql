-- Table: roles
create table public.roles
(
    role_name text   not null,
    constraint roles_role_pkey primary key (role_name)
);

alter table public.roles
    enable row level security;
create policy "Can view roles." on public.roles for select using (true);
create policy "None can create roles." on public.roles for insert with check (false);
create policy "None can update roles." on public.roles for update using (false);
create policy "None can delete roles." on public.roles for delete using (false);

-- Note: This table contains user data. Users should only be able to view and update their own data.
create table public.profiles
(
    id              uuid not null primary key,
    username        text,
    email           text,
    publicize_email boolean default false,
    image           text,
    bio             text    default '',
    role            text    default 'User',
    constraint "profiles_id_fkey" foreign key ("id")
        references auth.users (id) match simple
        on update no action
        on delete cascade,                                                                            -- if a user is deleted in auth they will also be deleted in our public table. TODO: Make sure this is recoverable within 30 days of deletion.
    constraint "profiles_role_fkey" foreign key ("role")
        references public.roles (role_name) match simple
        on update no action
        on delete no action,
    constraint check_email_format check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') -- Email format check
);
alter table public.profiles
    enable row level security;
create policy "Can view own user data." on public.profiles for select using ((select auth.uid()) = id);
create policy "Can create new user data." on public.profiles for insert with check ((select auth.uid()) = id);
create policy "Can update own user data." on public.profiles for update using ((select auth.uid()) = id);
create policy "Can delete own user data." on public.profiles for delete using ((select auth.uid()) = id);

-- Table: categories
create table if not exists public.categories
(
    category_name text not null,
    constraint categories_category_name_pkey primary key (category_name)
);

alter table public.categories
    enable row level security;
create policy "Can view categories." on public.categories for select using (true);
create policy "None can create categories." on public.categories for insert with check (false);
create policy "None can update categories." on public.categories for update using (false);
create policy "None can delete categories." on public.categories for delete using (false);

-- Function: validate_categories(TEXT[])
CREATE OR REPLACE FUNCTION validate_categories(categories TEXT[])
    RETURNS BOOLEAN AS
$$
BEGIN
    -- Check if all categories in the array exist in the categories table
    RETURN (SELECT array_length(array_agg(c.category_name), 1) = array_length(categories, 1)
            FROM unnest(categories) AS cat
                     LEFT JOIN public.categories c ON c.category_name = cat
            WHERE c.category_name IS NOT NULL);
END;
$$ LANGUAGE plpgsql SECURITY INVOKER set search_path = '';

-- Table: software
create table if not exists public.software
(
    id           serial not null,
    name         text   not null,
    image        text   not null,
    tagline      text   not null,
    description  text   not null,
    developer_id uuid   not null,
    created_at   timestamp default CURRENT_TIMESTAMP,
    project_url  text   not null,
    categories   text[] not null,
    constraint software_id_pkey primary key (id),
    constraint software_developer_id_fkey foreign key (developer_id)
        references auth.users (id) MATCH SIMPLE
        on update no action
        on delete cascade,
    constraint software_check_categories check (validate_categories(categories))
);

alter table public.software
    enable row level security;
create policy "Can view own software records." on public.software for select using ((select auth.uid()) = developer_id);
create policy "Can create new software records." on public.software for insert with check ((select auth.uid()) = developer_id);
create policy "Can update own existing software records." on public.software for update using ((select auth.uid()) = developer_id);
create policy "Can delete own software records." on public.software for delete using ((select auth.uid()) = developer_id);

-- Table: software_categories
create table if not exists public.software_categories
(
    software_id integer not null,
    category    text    not null,
    constraint software_categories_software_id_category_pkey primary key (software_id, category),
    constraint software_categories_software_id_fkey foreign key (software_id)
        references public.software (id)
        on update no action
        on delete cascade,
    constraint software_categories_category_fkey foreign key (category)
        references public.categories (category_name)
        on update no action
        on delete cascade
);

alter table public.software_categories
    enable row level security;
create policy "Can view software categories." on public.software_categories for select using (true);
create policy "Can create new software categories." on public.software_categories for insert with check ((select auth.uid()) = (select developer_id from public.software where id = software_id));
create policy "None can update software categories." on public.software_categories for update using (false);
create policy "Can delete own software categories." on public.software_categories for delete using ((select auth.uid()) = (select developer_id from public.software where id = software_id));


-- This trigger automatically registers software categories when a new software entry is created.
CREATE OR REPLACE FUNCTION register_software_categories()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Insert each category from the array into the software_categories table
    INSERT INTO public.software_categories (software_id, category)
    SELECT NEW.id, unnest(NEW.categories);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER set search_path = '';
CREATE TRIGGER after_new_software
    AFTER INSERT ON public.software
    FOR EACH ROW
EXECUTE FUNCTION register_software_categories();

-- Table: releases
create table if not exists public.releases
(
    id            serial  not null,
    software_id   integer not null,
    version       text    not null,
    changelog     text,
    artifact      text    not null,
    release_date  date    not null,
    extra_data    jsonb,
    constraint releases_id_pkey primary key (id),
    constraint releases_software_id_fkey foreign key (software_id)
        references public.software (id)
        on update no action
        on delete cascade,
    constraint releases_software_id_version_unique unique (software_id, version)
);

alter table public.releases
    enable row level security;
create policy "Anyone can view releases." on public.releases for select using (true);
create policy "Can create new releases if not a user role." on public.releases for insert with check (
    (select auth.uid()) = (select developer_id from public.software where id = software_id) and
    (exists (select 1 from public.profiles where profiles.id = (select auth.uid()) and profiles.role != 'User')));
create policy "Can update own releases." on public.releases for update using ((select auth.uid()) = (select developer_id
                                                                                                     from public.software
                                                                                                     where id = software_id));
create policy "Can delete own releases." on public.releases for delete using ((select auth.uid()) = (select developer_id
                                                                                                     from public.software
                                                                                                     where id = software_id));

-- Table: user_followers
create table if not exists public.user_followers
(
    id           serial not null,
    follower_id  uuid   not null,
    developer_id uuid   not null,
    followed_at  timestamp default CURRENT_TIMESTAMP,
    constraint user_followers_id_pkey primary key (id),
    constraint user_followers_follower_id_fkey foreign key (follower_id)
        references auth.users (id) MATCH SIMPLE
        on update no action
        on delete cascade,
    constraint user_followers_developer_id_fkey foreign key (developer_id)
        references auth.users (id) MATCH SIMPLE
        on update no action
        on delete cascade,
    constraint user_followers_follower_id_developer_id_unique unique (follower_id, developer_id)
);

alter table public.user_followers
    enable row level security;
create policy "Can view followed users." on public.user_followers for select using ((select auth.uid()) = follower_id);
create policy "Can follow other users." on public.user_followers for insert with check ((select auth.uid()) = follower_id);
create policy "Can unfollow other users." on public.user_followers for delete using ((select auth.uid()) = follower_id);

-- Table: software_followers
create table if not exists public.software_followers
(
    id          serial  not null,
    follower_id uuid    not null,
    software_id integer not null,
    followed_at timestamp default CURRENT_TIMESTAMP,
    constraint software_followers_id_pkey primary key (id),
    constraint software_followers_follower_id_fkey foreign key (follower_id)
        references auth.users (id) MATCH SIMPLE
        on update no action
        on delete cascade,
    constraint software_followers_software_id_fkey foreign key (software_id)
        references public.software (id)
        on update no action
        on delete cascade,
    constraint software_followers_follower_id_software_id_unique unique (follower_id, software_id)
);

alter table public.software_followers
    enable row level security;
create policy "Can view followed softwares." on public.software_followers for select using ((select auth.uid()) = follower_id);
create policy "Can follow software releases." on public.software_followers for insert with check ((select auth.uid()) = follower_id);
create policy "Can unfollow software releases." on public.software_followers for delete using ((select auth.uid()) = follower_id);

-- Table: notifications
create table if not exists public.notifications
(
    id          serial  not null,
    user_id     uuid    not null,
    software_id integer not null,
    release_id  integer not null,
    created_at  timestamp default CURRENT_TIMESTAMP,
    is_read     boolean   default false,
    constraint notifications_id_pkey primary key (id),
    constraint notifications_user_id_fkey foreign key (user_id)
        references auth.users (id) MATCH SIMPLE
        on update no action
        on delete cascade,
    constraint notifications_software_id_fkey foreign key (software_id)
        references public.software (id)
        on update no action
        on delete cascade,
    constraint notifications_release_id_fkey foreign key (release_id)
        references public.releases (id)
        on update no action
        on delete cascade
);

alter table public.notifications
    enable row level security;
create policy "Can view own notifications." on public.notifications for select using ((select auth.uid()) = user_id);
create policy "Can update own notifications." on public.notifications for update using ((select auth.uid()) = user_id);

-- This trigger automatically deletes old read notifications after 30 days.
CREATE OR REPLACE FUNCTION delete_old_notifications()
    RETURNS TRIGGER AS
$$
BEGIN
    DELETE FROM public.notifications WHERE is_read = TRUE AND created_at < NOW() - INTERVAL '30 days';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER set search_path = '';
CREATE TRIGGER delete_old_read_notifications_trigger
    AFTER INSERT ON notifications -- TODO: debounce trigger on update is_read
    FOR EACH ROW
EXECUTE FUNCTION delete_old_notifications();

-- Table: ratings
create table if not exists public.ratings
(
    id          serial  not null,
    user_id     uuid    not null,
    software_id integer not null,
    rating_type char,
    created_at  timestamp default CURRENT_TIMESTAMP,
    constraint ratings_id_pkey primary key (id),
    constraint ratings_user_id_fkey foreign key (user_id)
        references auth.users (id) MATCH SIMPLE
        on update no action
        on delete cascade,
    constraint ratings_software_id_fkey foreign key (software_id)
        references public.software (id)
        on update no action
        on delete cascade,
    constraint ratings_check_type_char check (rating_type in ('L', 'D')),
    constraint ratings_user_id_software_id_unique unique (user_id, software_id),
    constraint ratings_check_user_id check (auth.uid() != user_id)
);

alter table public.ratings
    enable row level security;
create policy "Can view own ratings." on public.ratings for select using ((select auth.uid()) = user_id);
create policy "Can create new ratings." on public.ratings for insert with check ((select auth.uid()) = user_id);
create policy "Can update own ratings." on public.ratings for update using ((select auth.uid()) = user_id);
create policy "Can delete own ratings." on public.ratings for delete using ((select auth.uid()) = user_id);

-- Table: comments
create table if not exists public.comments
(
    id               serial  not null,
    user_id          uuid    not null,
    software_id      integer not null,
    software_release integer not null,
    comment          text    not null,
    created_at       timestamp default CURRENT_TIMESTAMP,
    constraint comments_id_pkey primary key (id),
    constraint comments_user_id_fkey foreign key (user_id)
        references auth.users (id) MATCH SIMPLE
        on update no action
        on delete cascade,
    constraint comments_software_id_fkey foreign key (software_id)
        references public.software (id)
        on update no action
        on delete cascade,
    constraint comments_software_release_fkey foreign key (software_release)
        references public.releases (id)
        on update no action
        on delete cascade
);

alter table public.comments
    enable row level security;
create policy "Can view own comments." on public.comments for select using ((select auth.uid()) = user_id);
create policy "Can create new comments." on public.comments for insert with check ((select auth.uid()) = user_id);
create policy "Can update own comments." on public.comments for update using ((select auth.uid()) = user_id);
create policy "Can delete own comments." on public.comments for delete using ((select auth.uid()) = user_id);

-- Table: namespaces
create table if not exists public.namespaces
(
    namespace        text    not null,
    software_id      integer not null,
    software_release integer not null,
    constraint namespaces_namespace_pkey primary key (namespace),
    constraint namespaces_software_id_fkey foreign key (software_id)
        references public.software (id)
        on update no action
        on delete cascade,
    constraint namespaces_software_release_fkey foreign key (software_release)
        references public.releases (id)
        on update no action
        on delete cascade,
    constraint namespaces_namespace_software_id_software_release_unique unique (namespace, software_id, software_release)
);

alter table public.namespaces
    enable row level security;
create policy "Can view own namespaces." on public.namespaces for select using ((select auth.uid()) = (select developer_id from public.software where id = software_id));
create policy "Can create new namespaces." on public.namespaces for insert with check ((select auth.uid()) = (select developer_id from public.software where id = software_id));
create policy "Can update own namespaces." on public.namespaces for update using ((select auth.uid()) = (select developer_id from public.software where id = software_id));
create policy "Can delete own namespaces." on public.namespaces for delete using ((select auth.uid()) = (select developer_id from public.software where id = software_id));

-- Table: commands
create table if not exists public.commands
(
    id          serial  not null,
    command     text    not null,
    arguments   text,
    software_id integer not null,
    constraint commands_id_pkey primary key (id),
    constraint commands_software_id_fkey foreign key (software_id)
        references public.software (id)
        on update no action
        on delete cascade,
    constraint commands_command_software_id_unique unique (command, software_id)
);

alter table public.commands
    enable row level security;
create policy "Can view own commands." on public.commands for select using ((select auth.uid()) = (select developer_id from public.software where id = software_id));
create policy "Can create new commands." on public.commands for insert with check ((select auth.uid()) = (select developer_id from public.software where id = software_id));
create policy "Can update own commands." on public.commands for update using ((select auth.uid()) = (select developer_id from public.software where id = software_id));
create policy "Can delete own commands." on public.commands for delete using ((select auth.uid()) = (select developer_id from public.software where id = software_id));