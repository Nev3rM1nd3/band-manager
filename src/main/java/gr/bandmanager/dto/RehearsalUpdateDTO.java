package gr.bandmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record RehearsalUpdateDTO(

        @NotNull
        Instant startsAt,

        Instant endsAt,

        @NotBlank
        @Size(max = 255)
        String location,

        @Size(max = 2000)
        String notes
) {
}