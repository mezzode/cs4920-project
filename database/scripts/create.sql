<<<<<<< HEAD
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
=======
-- Create schema
CREATE TABLE users
(
    id serial primary key not null,
    username text not null,
    password text not null,
    email text not null,
    image text
);

CREATE TYPE media_type AS ENUM ('game', 'anime', 'show', 'movie');

CREATE TABLE list
(
    id serial primary key not null,
    user_id int not null REFERENCES users ON DELETE CASCADE,
    media_type media_type not null,
    name text not null
);

CREATE TABLE media
(
    id serial primary key not null,
    api_id text not null
);

CREATE TABLE entry
(
    id serial primary key not null,
    media_id int not null REFERENCES media,
    list_id int not null REFERENCES list ON DELETE CASCADE,
    category text,
    rating int,
    last_updated TIMESTAMP,
    -- started/finished use ISO 8601 with partial dates allowed
    -- e.g. '2016', '2017-04-13', '2018-09'
    started text,
    finished text
);
>>>>>>> 9459a4c421f0866f284f8463b358bad81ae4374a
