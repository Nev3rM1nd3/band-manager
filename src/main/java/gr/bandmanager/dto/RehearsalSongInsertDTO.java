package gr.bandmanager.dto;

import gr.bandmanager.model.enums.RehearsalSongStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record RehearsalSongInsertDTO(

        @NotNull
        UUID rehearsalId,

        @NotNull
        UUID songId,

        @NotNull
        RehearsalSongStatus rehearsalSongStatus,

        @Size(max = 2000)
        String notes
) {
}