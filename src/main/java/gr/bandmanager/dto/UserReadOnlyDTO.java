package gr.bandmanager.dto;

import gr.bandmanager.model.enums.ApplicationRole;

import java.util.UUID;

public record UserReadOnlyDTO(

        UUID id,
        String firstname,
        String lastname,
        String email,
        ApplicationRole applicationRole,
        boolean enabled
) {
}