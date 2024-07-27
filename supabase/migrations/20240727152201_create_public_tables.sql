-- Table: software
create table if not exists software
(
    id           serial primary key,
    name         text   not null,
    tagline      text   not null,
    description  text   not null,
    developer_id uuid   not null,
    created_at   timestamp default CURRENT_TIMESTAMP,
    project_url  text   not null,
    categories   text[] not null,
    constraint fk_developer_id foreign key (developer_id) references public.users
);

-- Table: releases
create table if not exists releases
(
    id            serial primary key,
    software_id   integer not null,
    version       text    not null,
    changelog     text,
    artifact      text    not null,
    release_date  date    not null,
    supported_api text    not null,
    constraint fk_software_id foreign key (software_id) references software on delete cascade,
    unique (software_id, version)
);

-- Table: user_followers
create table if not exists user_followers
(
    id           serial primary key,
    follower_id  uuid not null,
    developer_id uuid not null,
    followed_at  timestamp default CURRENT_TIMESTAMP,
    constraint fk_follower_id foreign key (follower_id) references next_auth.users on delete cascade,
    constraint fk_developer_id foreign key (developer_id) references next_auth.users on delete cascade,
    unique (follower_id, developer_id)
);

-- Table: software_followers
create table if not exists software_followers
(
    id          serial primary key,
    follower_id uuid    not null,
    software_id integer not null,
    followed_at timestamp default CURRENT_TIMESTAMP,
    constraint fk_follower_id foreign key (follower_id) references next_auth.users on delete cascade,
    constraint fk_software_id foreign key (software_id) references software on delete cascade,
    unique (follower_id, software_id)
);

-- Table: notifications
create table if not exists notifications
(
    id          serial primary key,
    user_id     uuid    not null,
    software_id integer not null,
    release_id  integer not null,
    created_at  timestamp default CURRENT_TIMESTAMP,
    is_read     boolean   default false,
    constraint fk_user_id foreign key (user_id) references next_auth.users on delete cascade,
    constraint fk_software_id foreign key (software_id) references software on delete cascade,
    constraint fk_release_id foreign key (release_id) references releases on delete cascade
);

-- Table: ratings
create table if not exists ratings
(
    id          serial primary key,
    user_id     uuid    not null,
    software_id integer not null,
    rating_type char,
    created_at  timestamp default CURRENT_TIMESTAMP,
    constraint fk_user_id foreign key (user_id) references next_auth.users on delete cascade,
    constraint fk_software_id foreign key (software_id) references software on delete cascade,
    constraint check_rating_type check (rating_type in ('L', 'D')),
    unique (user_id, software_id)
);

-- Table: comments
create table if not exists comments
(
    id               serial primary key,
    user_id          uuid    not null,
    software_id      integer not null,
    software_release integer not null,
    comment          text    not null,
    created_at       timestamp default CURRENT_TIMESTAMP,
    constraint fk_user_id foreign key (user_id) references next_auth.users on delete cascade,
    constraint fk_software_id foreign key (software_id) references software on delete cascade,
    constraint fk_software_release foreign key (software_release) references releases on delete cascade
);

-- Table: namespaces
create table if not exists namespaces
(
    namespace        text    not null primary key,
    software_id      integer not null,
    software_release integer not null,
    constraint fk_software_id foreign key (software_id) references software on delete cascade,
    constraint fk_software_release foreign key (software_release) references releases on delete cascade,
    unique (namespace, software_id, software_release)
);

-- Table: commands
create table if not exists commands
(
    id          serial primary key,
    command     text    not null,
    arguments   text,
    software_id integer not null,
    constraint fk_software_id foreign key (software_id) references software on delete cascade,
    unique (command, software_id)
);

-- Table: categories
create table if not exists categories
(
    category_name text not null primary key
);

-- Table: software_categories
create table if not exists software_categories
(
    software_id integer not null,
    category    text    not null,
    constraint fk_software_id foreign key (software_id) references software on delete cascade,
    constraint fk_category foreign key (category) references categories on delete cascade,
    primary key (software_id, category)
);
