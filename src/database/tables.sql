DROP DATABASE IF EXISTS codice1;

CREATE DATABASE codice1;

CREATE TABLE IF NOT EXISTS texts (
    text_id serial PRIMARY KEY,
    title varchar NOT NULL,
    category varchar NOT NULL,
    added_by integer NOT NULL,
    grade integer NOT NULL,
    raw_content varchar NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);
