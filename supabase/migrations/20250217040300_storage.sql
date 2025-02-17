-- Use Postgres to create a bucket.

insert into storage.buckets
(id, name, public)
values
    ('avatars', 'avatars', true);

insert into storage.buckets
(id, name, public)
values
    ('releases', 'releases', true);
