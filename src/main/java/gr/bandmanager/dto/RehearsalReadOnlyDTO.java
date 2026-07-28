package gr.bandmanager.dto;

import java.time.Instant;
import java.util.UUID;

public record RehearsalReadOnlyDTO(

        UUID id,
        Instant startsAt,
        Instant endsAt,
        String location,
        String notes,

        UUID bandId,
        String bandName,

        Instant createdAt,
        Instant updatedAt
) {
}