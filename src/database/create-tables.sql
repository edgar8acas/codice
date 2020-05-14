CREATE TYPE text_status as ENUM ('processed', 'unprocessed', 'incomplete');

CREATE TABLE texts (
    text_id serial PRIMARY KEY,
    title varchar NOT NULL,
    category varchar NOT NULL,
    added_by integer NOT NULL,
    status text_status DEFAULT 'unprocessed',
    grade integer NOT NULL,
    raw_content varchar NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);

CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username varchar NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);

CREATE TABLE words (
    word_id serial PRIMARY KEY,
    word varchar NOT NULL,
    definition varchar NULL,
    image_url varchar NULL,
    video_url varchar NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);

CREATE TABLE template_words (
    word_id integer REFERENCES words (word_id),
    text_id integer REFERENCES texts (text_id),
    PRIMARY KEY (word_id, text_id),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);

CREATE TABLE dictionary_words (
    word_id integer REFERENCES words (word_id),
    text_id integer REFERENCES texts (text_id),
    user_id integer REFERENCES users (user_id),
    PRIMARY KEY (word_id, user_id, text_id),
    is_learned bool,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);