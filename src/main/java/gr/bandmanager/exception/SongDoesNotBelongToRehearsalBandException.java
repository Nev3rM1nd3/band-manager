package gr.bandmanager.exception;

public class SongDoesNotBelongToRehearsalBandException
        extends RuntimeException {

    public SongDoesNotBelongToRehearsalBandException() {
        super("Song does not belong to the rehearsal band");
    }
}