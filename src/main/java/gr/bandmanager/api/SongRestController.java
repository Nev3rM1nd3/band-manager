package gr.bandmanager.api;

import gr.bandmanager.dto.SongInsertDTO;
import gr.bandmanager.dto.SongReadOnlyDTO;
import gr.bandmanager.dto.SongUpdateDTO;
import gr.bandmanager.service.ISongService;
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
public class SongRestController {

    private final ISongService songService;

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

    @GetMapping("/{id}")
    public ResponseEntity<SongReadOnlyDTO> getSongById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(songService.getSongById(id));
    }

    @GetMapping("/band/{bandId}")
    public ResponseEntity<List<SongReadOnlyDTO>> getSongsByBandId(
            @PathVariable UUID bandId
    ) {
        return ResponseEntity.ok(songService.getSongsByBandId(bandId));
    }

    @GetMapping("/band/{bandId}/search")
    public ResponseEntity<List<SongReadOnlyDTO>> searchSongsByTitle(
            @PathVariable UUID bandId,
            @RequestParam String title
    ) {
        return ResponseEntity.ok(songService.searchSongsByTitle(bandId, title));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SongReadOnlyDTO> updateSong(
            @PathVariable UUID id,
            @Valid @RequestBody SongUpdateDTO dto) {

        return ResponseEntity.ok(songService.updateSong(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable UUID id) {
        songService.deleteSong(id);
        return ResponseEntity.noContent().build();
    }
}
