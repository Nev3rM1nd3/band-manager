package gr.bandmanager.exception;

import java.util.UUID;

public class RehearsalSongNotFoundException extends RuntimeException {

    public RehearsalSongNotFoundException(UUID id) {
        super("Rehearsal song not found with id: " + id);
    }
}