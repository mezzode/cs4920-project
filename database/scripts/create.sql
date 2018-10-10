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
