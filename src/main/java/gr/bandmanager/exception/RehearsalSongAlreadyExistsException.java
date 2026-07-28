package gr.bandmanager.exception;

public class RehearsalSongAlreadyExistsException extends RuntimeException {

    public RehearsalSongAlreadyExistsException() {
        super("Song already exists in this rehearsal");
    }
}