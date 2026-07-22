package gr.bandmanager.exception;

import java.util.UUID;

public class SongNotFoundException extends RuntimeException {

    public SongNotFoundException(UUID id) {
        super("Song not found with id: " + id);
    }
}