package gr.bandmanager.dto;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public record BandReadOnlyDTO(
        UUID id,
        String name,
        String description,
        Set<String> genres,
        Instant createdAt,
        Instant updatedAt
) {
}
