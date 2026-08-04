package gr.bandmanager.exception;

public class LastBandOwnerException extends RuntimeException {

    public LastBandOwnerException() {
        super("A band must have at least one owner");
    }
}