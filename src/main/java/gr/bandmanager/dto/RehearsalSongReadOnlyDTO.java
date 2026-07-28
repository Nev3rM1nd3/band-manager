package gr.bandmanager.dto;

import gr.bandmanager.model.enums.RehearsalSongStatus;

import java.time.Instant;
import java.util.UUID;

public record RehearsalSongReadOnlyDTO(

        UUID id,

        UUID rehearsalId,
        Instant rehearsalStartsAt,

        UUID songId,
        String songTitle,
        String songArtist,

        RehearsalSongStatus rehearsalSongStatus,
        String notes,

        Instant createdAt,
        Instant updatedAt
) {
}