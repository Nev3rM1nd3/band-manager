package gr.bandmanager.exception;

import java.util.UUID;

public class BandNotFoundException extends RuntimeException {

    public BandNotFoundException(UUID id) {
        super("Band not found with id: " + id);
    }
}