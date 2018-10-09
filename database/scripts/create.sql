-- Create schema
CREATE TABLE users
(
    id serial primary key not null,
    username text not null,
    password text not null,
    image bytea
);
CREATE TABLE list
(
    id serial primary key not null
);
CREATE TYPE mediaType as ENUM
('game', 'anime', 'movie', 'tv');
CREATE TABLE media
(
    id serial primary key not null,
    mediaType mediaType,
    api_id text not null
);
CREATE TYPE status AS ENUM
('progress', 'complete');
CREATE TABLE entry
(
    id serial primary key not null,
    media_id int not null,
    user_id int not null,
    status status,
    rating int,
    foreign key (media_id) references media(id),
    foreign key (user_id) references users(id)
);
