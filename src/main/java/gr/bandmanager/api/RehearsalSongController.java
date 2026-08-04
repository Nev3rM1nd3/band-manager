package gr.bandmanager.api;

import gr.bandmanager.dto.RehearsalSongInsertDTO;
import gr.bandmanager.dto.RehearsalSongReadOnlyDTO;
import gr.bandmanager.dto.RehearsalSongUpdateDTO;
import gr.bandmanager.service.IRehearsalSongService;
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
@RequestMapping("/api/rehearsal-songs")
@RequiredArgsConstructor
@Tag(
        name = "Rehearsal Songs",
        description = "Endpoints for managing songs assigned to rehearsals"
)
public class RehearsalSongController {

    private final IRehearsalSongService rehearsalSongService;

    @Operation(
            summary = "Add a song to a rehearsal",
            description = "Adds a song to a rehearsal. Only the band owner is allowed"
    )
    @PostMapping
    public ResponseEntity<RehearsalSongReadOnlyDTO> createRehearsalSong(
            @Valid @RequestBody RehearsalSongInsertDTO dto
    ) {
        RehearsalSongReadOnlyDTO createdRehearsalSong =
                rehearsalSongService.createRehearsalSong(dto);

        URI location = URI.create(
                "/api/rehearsal-songs/" + createdRehearsalSong.id()
        );

        return ResponseEntity
                .created(location)
                .body(createdRehearsalSong);
    }

    @Operation(
            summary = "Get rehearsal song by ID",
            description = "Returns a rehearsal song if the current user belongs to the rehearsal band"
    )
    @GetMapping("/{id}")
    public ResponseEntity<RehearsalSongReadOnlyDTO> getRehearsalSongById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                rehearsalSongService.getRehearsalSongById(id)
        );
    }

    @Operation(
            summary = "Get songs by rehearsal",
            description = "Returns all songs assigned to a rehearsal if the current user belongs to its band"
    )
    @GetMapping("/rehearsal/{rehearsalId}")
    public ResponseEntity<List<RehearsalSongReadOnlyDTO>>
    getRehearsalSongsByRehearsalId(
            @PathVariable UUID rehearsalId
    ) {
        return ResponseEntity.ok(
                rehearsalSongService
                        .getRehearsalSongsByRehearsalId(rehearsalId)
        );
    }

    @Operation(
            summary = "Update a rehearsal song",
            description = "Updates the rehearsal-specific song status and notes. Only the band owner is allowed"
    )
    @PutMapping("/{id}")
    public ResponseEntity<RehearsalSongReadOnlyDTO> updateRehearsalSong(
            @PathVariable UUID id,
            @Valid @RequestBody RehearsalSongUpdateDTO dto
    ) {
        return ResponseEntity.ok(
                rehearsalSongService.updateRehearsalSong(id, dto)
        );
    }

    @Operation(
            summary = "Remove a song from a rehearsal",
            description = "Removes a song from a rehearsal. Only the band owner is allowed"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRehearsalSong(
            @PathVariable UUID id
    ) {
        rehearsalSongService.deleteRehearsalSong(id);

        return ResponseEntity.noContent().build();
    }
}