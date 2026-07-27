package gr.bandmanager.dto;

import gr.bandmanager.model.enums.BandRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record BandMemberUpdateDTO(

        @NotBlank
        @Size(max = 50)
        String firstname,

        @NotBlank
        @Size(max = 50)
        String lastname,

        @NotBlank
        @Size(max = 50)
        String position,

        Set<@NotBlank @Size(max = 50) String> instruments,

        @NotNull
        BandRole bandRole
) {
}