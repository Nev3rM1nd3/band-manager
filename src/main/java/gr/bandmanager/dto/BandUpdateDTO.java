package gr.bandmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record BandUpdateDTO(

        @NotBlank
        @Size(max = 100)
        String name,

        @Size(max = 1000)
        String description,

        Set<@NotBlank @Size(max = 50) String> genres

) {
}
