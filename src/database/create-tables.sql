CREATE TYPE text_status as ENUM ('processed', 'unprocessed', 'incomplete');

CREATE TYPE word_type as ENUM (
    'artículo', 'sustantivo', 'pronombre',
    'adjetivo', 'verbo', 'adverbio',
    'preposición', 'conjunción', 'intersección');

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
    type word_type NOT NULL,
    image_url varchar NULL,
    video_url varchar NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);

CREATE TABLE template_occurrences (
    template_id serial PRIMARY KEY,
    start integer NOT NULL,
    ending integer NOT NULL,
    word varchar NOT NULL,
    text_id integer REFERENCES texts (text_id),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);

CREATE TABLE user_occurrences (
    user_occurrence_id serial PRIMARY KEY,
    selected_word_id integer REFERENCES words (word_id),
    text_id integer REFERENCES texts (text_id),
    user_id integer REFERENCES users (user_id),
    start integer NOT NULL,
    ending integer NOT NULL,
    word varchar NOT NULL,
    essential boolean NOT NULL,
    visible boolean NOT NULL,
    available_meanings boolean NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);

CREATE TABLE dictionary_words (
    dictionary_id serial PRIMARY KEY,
    word_id integer REFERENCES words (word_id),
    user_id integer REFERENCES users (user_id),
    is_learned bool DEFAULT false,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL
);