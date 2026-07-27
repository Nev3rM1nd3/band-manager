package gr.bandmanager.dto;

import gr.bandmanager.model.enums.BandRole;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public record BandMemberReadOnlyDTO(

        UUID id,
        String firstname,
        String lastname,
        String position,
        Set<String> instruments,
        BandRole bandRole,

        UUID bandId,
        String bandName,

        UUID userId,
        String userEmail,

        Instant createdAt,
        Instant updatedAt
) {
}