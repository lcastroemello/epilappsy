------------USER REGISTRATION----------------------------
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR (255) NOT NULL CHECK (first <> ''),
    last VARCHAR (255) NOT NULL CHECK (last <> ''),
    email VARCHAR (255) NOT NULL CHECK (email <> '') UNIQUE,
    password_digest VARCHAR (255) NOT NULL CHECK (password_digest <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

-----------CRISIS MONITORING-----------------------------

DROP TABLE IF EXISTS crisis;

CREATE TABLE crisis (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    type VARCHAR(255),
    duration_sec INT,
    eat BOOLEAN,
    sleep BOOLEAN,
    meds BOOLEAN,
    stress BOOLEAN,
    period BOOLEAN,
    tired BOOLEAN,
    other VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM crisis;
