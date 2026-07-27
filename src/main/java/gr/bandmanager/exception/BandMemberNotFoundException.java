package gr.bandmanager.exception;

import java.util.UUID;

public class BandMemberNotFoundException extends RuntimeException {

    public BandMemberNotFoundException(UUID id) {
        super("Band member not found with id: " + id);
    }
}