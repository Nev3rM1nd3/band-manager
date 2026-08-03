package gr.bandmanager.exception;

public class BandAccessDeniedException extends RuntimeException {

    public BandAccessDeniedException() {
        super("You do not have permission to manage this band");
    }
}