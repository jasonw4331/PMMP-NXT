--
-- This File contains seed data themed for a Minecraft Plugin Database.
--

-- Seed Roles table
INSERT INTO public.roles (role_name)
VALUES ('Admin');
INSERT INTO public.roles (role_name)
VALUES ('Reviewer');
INSERT INTO public.roles (role_name)
VALUES ('Developer');
INSERT INTO public.roles (role_name)
VALUES ('User');

-- Seed Categories table
INSERT INTO public.categories (category_name)
VALUES ('APIs and Libraries');
INSERT INTO public.categories (category_name)
VALUES ('Admin Tools');
INSERT INTO public.categories (category_name)
VALUES ('Builder Tools');
INSERT INTO public.categories (category_name)
VALUES ('Chat Interaction');
INSERT INTO public.categories (category_name)
VALUES ('Combat');
INSERT INTO public.categories (category_name)
VALUES ('Developer Tools');
INSERT INTO public.categories (category_name)
VALUES ('Economy');
INSERT INTO public.categories (category_name)
VALUES ('Minigame');
INSERT INTO public.categories (category_name)
VALUES ('Miscellaneous');
INSERT INTO public.categories (category_name)
VALUES ('Standalone');
INSERT INTO public.categories (category_name)
VALUES ('Vanilla Mechanics');
INSERT INTO public.categories (category_name)
VALUES ('World Generation');

-- Seed next_auth.users table
INSERT INTO next_auth.users (id, name, email, "emailVerified", image)
VALUES ('00000000-0000-0000-0000-000000000000', 'jasonw4331', 'admin@example.com', '2022-07-28 22:05:29.000000', '');


-- Seed public.software table
INSERT INTO public.software (id, name, tagline, description, developer_id, project_url, categories)
VALUES (0, 'PoliteTeleports', 'A plugin which allows players to politely ask for a teleport', '',
        '00000000-0000-0000-0000-000000000000', 'https://github.com/jasonw4331/PoliteTeleports',
        ARRAY ['Chat Interaction', 'Miscellaneous']);

-- Seed public.releases table
INSERT INTO public.releases (id, software_id, version, changelog, artifact, release_date, extra_data)
VALUES (0, 0, '2.1.3', 'Markdown Changelog Here', 'https://github.com/jasonw4331/PoliteTeleports/release/v2.1.3', CURRENT_TIMESTAMP, '{"supported_api":"5.0.0"}');

-- Seed namespaces table
INSERT INTO public.namespaces (namespace, software_id, software_release)
VALUES ('jasonw4331/PoliteTeleports', 0, 0);

-- Seed commands table
INSERT INTO public.commands (command, arguments, software_id)
VALUES ('/tpa', '<player: target>', 0);
