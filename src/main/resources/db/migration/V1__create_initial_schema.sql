CREATE TABLE users (
                       id UUID PRIMARY KEY,
                       firstname VARCHAR(50) NOT NULL,
                       lastname VARCHAR(50) NOT NULL,
                       email VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       application_role VARCHAR(255) NOT NULL,
                       enabled BOOLEAN NOT NULL,
                       created_at TIMESTAMPTZ NOT NULL,
                       updated_at TIMESTAMPTZ NOT NULL,

                       CONSTRAINT uk_users_email UNIQUE (email)
);

CREATE TABLE bands (
                       id UUID PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       description VARCHAR(1000),
                       created_at TIMESTAMPTZ NOT NULL,
                       updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE band_genres (
                             band_id UUID NOT NULL,
                             genre VARCHAR(50) NOT NULL,

                             CONSTRAINT fk_band_genres_band
                                 FOREIGN KEY (band_id)
                                     REFERENCES bands(id)
                                     ON DELETE CASCADE,

                             CONSTRAINT uk_band_genres
                                 UNIQUE (band_id, genre)
);

CREATE TABLE band_members (
                              id UUID PRIMARY KEY,
                              firstname VARCHAR(50) NOT NULL,
                              lastname VARCHAR(50) NOT NULL,
                              position VARCHAR(50) NOT NULL,
                              band_role VARCHAR(255) NOT NULL,
                              band_id UUID NOT NULL,
                              user_id UUID,
                              created_at TIMESTAMPTZ NOT NULL,
                              updated_at TIMESTAMPTZ NOT NULL,

                              CONSTRAINT fk_band_members_band
                                  FOREIGN KEY (band_id)
                                      REFERENCES bands(id),

                              CONSTRAINT fk_band_members_user
                                  FOREIGN KEY (user_id)
                                      REFERENCES users(id)
);

CREATE TABLE band_member_instruments (
                                         band_member_id UUID NOT NULL,
                                         instrument VARCHAR(50) NOT NULL,

                                         CONSTRAINT fk_member_instruments_member
                                             FOREIGN KEY (band_member_id)
                                                 REFERENCES band_members(id)
                                                 ON DELETE CASCADE,

                                         CONSTRAINT uk_member_instruments
                                             UNIQUE (band_member_id, instrument)
);

CREATE TABLE songs (
                       id UUID PRIMARY KEY,
                       title VARCHAR(150) NOT NULL,
                       artist VARCHAR(150) NOT NULL,
                       song_status VARCHAR(255) NOT NULL,
                       notes VARCHAR(2000),
                       band_id UUID NOT NULL,
                       created_at TIMESTAMPTZ NOT NULL,
                       updated_at TIMESTAMPTZ NOT NULL,

                       CONSTRAINT fk_songs_band
                           FOREIGN KEY (band_id)
                               REFERENCES bands(id)
);

CREATE TABLE rehearsals (
                            id UUID PRIMARY KEY,
                            starts_at TIMESTAMPTZ NOT NULL,
                            ends_at TIMESTAMPTZ,
                            location VARCHAR(255) NOT NULL,
                            notes VARCHAR(2000),
                            band_id UUID NOT NULL,
                            created_at TIMESTAMPTZ NOT NULL,
                            updated_at TIMESTAMPTZ NOT NULL,

                            CONSTRAINT fk_rehearsals_band
                                FOREIGN KEY (band_id)
                                    REFERENCES bands(id),

                            CONSTRAINT chk_rehearsal_end_after_start
                                CHECK (ends_at IS NULL OR ends_at > starts_at)
);

CREATE TABLE rehearsal_songs (
                                 id UUID PRIMARY KEY,
                                 rehearsal_id UUID NOT NULL,
                                 song_id UUID NOT NULL,
                                 rehearsal_song_status VARCHAR(255) NOT NULL,
                                 notes VARCHAR(2000),
                                 created_at TIMESTAMPTZ NOT NULL,
                                 updated_at TIMESTAMPTZ NOT NULL,

                                 CONSTRAINT fk_rehearsal_songs_rehearsal
                                     FOREIGN KEY (rehearsal_id)
                                         REFERENCES rehearsals(id)
                                         ON DELETE CASCADE,

                                 CONSTRAINT fk_rehearsal_songs_song
                                     FOREIGN KEY (song_id)
                                         REFERENCES songs(id),

                                 CONSTRAINT uk_rehearsal_song
                                     UNIQUE (rehearsal_id, song_id)
);