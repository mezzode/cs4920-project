-- CEAS;
-- CREATE DATABASE appdb;
-- CREATE TABLE users (
--     id int primary key not null, 
--     username text not null, 
--     password text not null,
--     image bytea
-- );
-- CREATE TABLE list (
--     id int primary key not null
-- );
-- CREATE TABLE media (
--     id int primary key not null,
--     api_id int not null
-- );
-- CREATE TYPE status AS ENUM ('progress', 'complete');
-- CREATE TABLE entry (
--     id int primary key not null,
--     media_id int not null,
--     user_id int not null,
--     status status,
--     rating int,
--     foreign key (media_id) references media(id),
--     foreign key (user_id) references users(id) 
-- );

-- SELECT * FROM users;

/*
Commands:
psql __dbname__     - load command line connected to database
\l                  - list databases
\d                  - show tables
\d __tablename__    - table definition
*/