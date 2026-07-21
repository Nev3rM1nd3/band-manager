ALTER TABLE songs
    ADD COLUMN bpm INTEGER,
ADD COLUMN song_key VARCHAR(20),
ADD COLUMN duration_seconds INTEGER;

ALTER TABLE songs
    ADD CONSTRAINT chk_songs_bpm
        CHECK (bpm IS NULL OR bpm BETWEEN 1 AND 400);

ALTER TABLE songs
    ADD CONSTRAINT chk_songs_duration
        CHECK (duration_seconds IS NULL OR duration_seconds > 0);