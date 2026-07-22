package gr.bandmanager.dto;

import gr.bandmanager.model.enums.SongStatus;

import java.time.Instant;
import java.util.UUID;

public record SongReadOnlyDTO(
        UUID id,
        String title,
        String artist,
        SongStatus songStatus,
        String notes,
        Integer bpm,
        String songKey,
        Integer durationSeconds,
        UUID bandId,
        String bandName,
        Instant createdAt,
        Instant updatedAt

) {
}
