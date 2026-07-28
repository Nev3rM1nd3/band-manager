package gr.bandmanager.dto;

import gr.bandmanager.model.enums.RehearsalSongStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RehearsalSongUpdateDTO(

        @NotNull
        RehearsalSongStatus rehearsalSongStatus,

        @Size(max = 2000)
        String notes
) {
}