package gr.bandmanager.api;

import gr.bandmanager.dto.RehearsalSongInsertDTO;
import gr.bandmanager.dto.RehearsalSongReadOnlyDTO;
import gr.bandmanager.dto.RehearsalSongUpdateDTO;
import gr.bandmanager.service.IRehearsalSongService;
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
public class RehearsalSongController {

    private final IRehearsalSongService rehearsalSongService;

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

    @GetMapping("/{id}")
    public ResponseEntity<RehearsalSongReadOnlyDTO> getRehearsalSongById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                rehearsalSongService.getRehearsalSongById(id)
        );
    }

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

    @PutMapping("/{id}")
    public ResponseEntity<RehearsalSongReadOnlyDTO> updateRehearsalSong(
            @PathVariable UUID id,
            @Valid @RequestBody RehearsalSongUpdateDTO dto
    ) {
        return ResponseEntity.ok(
                rehearsalSongService.updateRehearsalSong(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRehearsalSong(
            @PathVariable UUID id
    ) {
        rehearsalSongService.deleteRehearsalSong(id);

        return ResponseEntity.noContent().build();
    }
}