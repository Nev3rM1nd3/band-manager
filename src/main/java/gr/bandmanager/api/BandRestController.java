package gr.bandmanager.api;

import gr.bandmanager.dto.BandInsertDTO;
import gr.bandmanager.dto.BandReadOnlyDTO;
import gr.bandmanager.dto.BandUpdateDTO;
import gr.bandmanager.service.IBandService;
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
@RequestMapping("/api/bands")
@RequiredArgsConstructor
@Tag(
        name = "Bands",
        description = "Endpoints for managing bands"
)
public class BandRestController {

    private final IBandService bandService;

    @Operation(
            summary = "Create a band",
            description = "Creates a new band and assigns the current user as owner"
    )
    @PostMapping
    public ResponseEntity<BandReadOnlyDTO> createBand(
            @Valid @RequestBody BandInsertDTO dto) {
        BandReadOnlyDTO createdBand = bandService.createBand(dto);

        URI location = URI.create("/api/bands/" + createdBand.id());

        return ResponseEntity
                .created(location)
                .body(createdBand);
    }

    @Operation(
            summary = "Get band by ID",
            description = "Returns a band if the current user is a member of it"
    )
    @GetMapping("/{id}")
    public ResponseEntity<BandReadOnlyDTO> getBandById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(bandService.getBandById(id));
    }

    @Operation(
            summary = "Get current user's bands",
            description = "Returns all bands in which the current user is a member"
    )
    @GetMapping
    public ResponseEntity<List<BandReadOnlyDTO>> getAllBands() {
        return ResponseEntity.ok(bandService.getAllBands());
    }

    @Operation(
            summary = "Update a band",
            description = "Updates a band. Only the band owner is allowed"
    )
    @PutMapping("/{id}")
    public ResponseEntity<BandReadOnlyDTO> updateBand(
            @PathVariable UUID id,
            @Valid @RequestBody BandUpdateDTO dto
    ) {
        return ResponseEntity.ok(bandService.updateBand(id, dto));
    }

    @Operation(
            summary = "Delete a band",
            description = "Deletes a band. Only the band owner is allowed"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBand(
            @PathVariable UUID id
    ) {
        bandService.deleteBand(id);

        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Search bands by name",
            description = "Searches the current user's bands by name, ignoring letter case"
    )
    @GetMapping("/search")
    public ResponseEntity<List<BandReadOnlyDTO>> searchBandsByName(
            @RequestParam String name
    ){
        return ResponseEntity.ok(bandService.searchBandsByName(name));
    }
}
