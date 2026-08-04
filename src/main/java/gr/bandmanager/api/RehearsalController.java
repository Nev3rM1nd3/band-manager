package gr.bandmanager.api;

import gr.bandmanager.dto.RehearsalInsertDTO;
import gr.bandmanager.dto.RehearsalReadOnlyDTO;
import gr.bandmanager.dto.RehearsalUpdateDTO;
import gr.bandmanager.service.IRehearsalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/rehearsals")
@RequiredArgsConstructor
@Tag(
        name = "Rehearsals",
        description = "Endpoints for managing band rehearsals"
)
public class RehearsalController {

    private final IRehearsalService rehearsalService;

    @Operation(
            summary = "Create a rehearsal",
            description = "Creates a new rehearsal for a band. Only the band owner is allowed"
    )
    @PostMapping
    public ResponseEntity<RehearsalReadOnlyDTO> createRehearsal(
            @Valid @RequestBody RehearsalInsertDTO dto
    ) {
        RehearsalReadOnlyDTO createdRehearsal =
                rehearsalService.createRehearsal(dto);

        URI location = URI.create(
                "/api/rehearsals/" + createdRehearsal.id()
        );

        return ResponseEntity
                .created(location)
                .body(createdRehearsal);
    }

    @Operation(
            summary = "Get rehearsal by ID",
            description = "Returns a rehearsal if the current user belongs to its band"
    )
    @GetMapping("/{id}")
    public ResponseEntity<RehearsalReadOnlyDTO> getRehearsalById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                rehearsalService.getRehearsalById(id)
        );
    }

    @Operation(
            summary = "Get rehearsals by band",
            description = "Returns all rehearsals of a band if the current user belongs to it"
    )
    @GetMapping("/band/{bandId}")
    public ResponseEntity<List<RehearsalReadOnlyDTO>> getRehearsalsByBandId(
            @PathVariable UUID bandId
    ) {
        return ResponseEntity.ok(
                rehearsalService.getRehearsalsByBandId(bandId)
        );
    }

    @Operation(
            summary = "Update a rehearsal",
            description = "Updates a rehearsal. Only the band owner is allowed"
    )
    @PutMapping("/{id}")
    public ResponseEntity<RehearsalReadOnlyDTO> updateRehearsal(
            @PathVariable UUID id,
            @Valid @RequestBody RehearsalUpdateDTO dto
    ) {
        return ResponseEntity.ok(
                rehearsalService.updateRehearsal(id, dto)
        );
    }

    @Operation(
            summary = "Delete a rehearsal",
            description = "Deletes a rehearsal. Only the band owner is allowed"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRehearsal(
            @PathVariable UUID id
    ) {
        rehearsalService.deleteRehearsal(id);

        return ResponseEntity.noContent().build();
    }
}