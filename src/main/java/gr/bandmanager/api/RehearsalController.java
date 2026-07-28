package gr.bandmanager.api;

import gr.bandmanager.dto.RehearsalInsertDTO;
import gr.bandmanager.dto.RehearsalReadOnlyDTO;
import gr.bandmanager.dto.RehearsalUpdateDTO;
import gr.bandmanager.service.IRehearsalService;
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
public class RehearsalController {

    private final IRehearsalService rehearsalService;

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

    @GetMapping("/{id}")
    public ResponseEntity<RehearsalReadOnlyDTO> getRehearsalById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                rehearsalService.getRehearsalById(id)
        );
    }

    @GetMapping("/band/{bandId}")
    public ResponseEntity<List<RehearsalReadOnlyDTO>> getRehearsalsByBandId(
            @PathVariable UUID bandId
    ) {
        return ResponseEntity.ok(
                rehearsalService.getRehearsalsByBandId(bandId)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<RehearsalReadOnlyDTO> updateRehearsal(
            @PathVariable UUID id,
            @Valid @RequestBody RehearsalUpdateDTO dto
    ) {
        return ResponseEntity.ok(
                rehearsalService.updateRehearsal(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRehearsal(
            @PathVariable UUID id
    ) {
        rehearsalService.deleteRehearsal(id);

        return ResponseEntity.noContent().build();
    }
}