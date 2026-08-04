package gr.bandmanager.api;

import gr.bandmanager.dto.SongInsertDTO;
import gr.bandmanager.dto.SongReadOnlyDTO;
import gr.bandmanager.dto.SongUpdateDTO;
import gr.bandmanager.service.ISongService;
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
@RequestMapping("/api/songs")
@RequiredArgsConstructor
@Tag(
        name = "Songs",
        description = "Endpoints for managing band songs"
)
public class SongRestController {

    private final ISongService songService;

    @Operation(
            summary = "Create a song",
            description = "Creates a new song for a band. Only the band owner is allowed"
    )
    @PostMapping
    public ResponseEntity<SongReadOnlyDTO> createSong(
            @Valid @RequestBody SongInsertDTO dto
    ) {
        SongReadOnlyDTO createdSong = songService.createSong(dto);

        URI location = URI.create("/api/songs/" + createdSong.id());

        return ResponseEntity
                .created(location)
                .body(createdSong);
    }

    @Operation(
            summary = "Get song by ID",
            description = "Returns a song if the current user belongs to its band"
    )
    @GetMapping("/{id}")
    public ResponseEntity<SongReadOnlyDTO> getSongById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(songService.getSongById(id));
    }

    @Operation(
            summary = "Get songs by band",
            description = "Returns all songs of a band if the current user belongs to it"
    )
    @GetMapping("/band/{bandId}")
    public ResponseEntity<List<SongReadOnlyDTO>> getSongsByBandId(
            @PathVariable UUID bandId
    ) {
        return ResponseEntity.ok(songService.getSongsByBandId(bandId));
    }

    @Operation(
            summary = "Search songs by title",
            description = "Searches songs by title within a band if the current user belongs to it"
    )
    @GetMapping("/band/{bandId}/search")
    public ResponseEntity<List<SongReadOnlyDTO>> searchSongsByTitle(
            @PathVariable UUID bandId,
            @RequestParam String title
    ) {
        return ResponseEntity.ok(songService.searchSongsByTitle(bandId, title));
    }

    @Operation(
            summary = "Update a song",
            description = "Updates a song. Only the band owner is allowed"
    )
    @PutMapping("/{id}")
    public ResponseEntity<SongReadOnlyDTO> updateSong(
            @PathVariable UUID id,
            @Valid @RequestBody SongUpdateDTO dto) {

        return ResponseEntity.ok(songService.updateSong(id, dto));
    }

    @Operation(
            summary = "Delete a song",
            description = "Deletes a song. Only the band owner is allowed"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable UUID id) {
        songService.deleteSong(id);
        return ResponseEntity.noContent().build();
    }
}
