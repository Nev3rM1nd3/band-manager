package gr.bandmanager.dto;

import gr.bandmanager.model.enums.SongStatus;
import jakarta.validation.constraints.*;

public record SongUpdateDTO(

        @NotBlank
        @Size(max = 150)
        String title,

        @NotBlank
        @Size(max = 150)
        String artist,

        @NotNull
        SongStatus songStatus,

        @Size(max = 2000)
        String notes,

        @Min(1)
        @Max(400)
        Integer bpm,

        @Size(max = 20)
        String songKey,

        @Positive
        Integer durationSeconds
) {
}