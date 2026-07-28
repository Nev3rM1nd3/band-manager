package gr.bandmanager.exception;

import java.util.UUID;

public class RehearsalNotFoundException extends RuntimeException {

    public RehearsalNotFoundException(UUID id) {
        super("Rehearsal not found with id: " + id);
    }
}