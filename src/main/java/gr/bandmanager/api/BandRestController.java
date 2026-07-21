package gr.bandmanager.api;

import gr.bandmanager.dto.BandInsertDTO;
import gr.bandmanager.dto.BandReadOnlyDTO;
import gr.bandmanager.service.IBandService;
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
public class BandRestController {

    private final IBandService bandService;

    @PostMapping
    public ResponseEntity<BandReadOnlyDTO> createBand(
            @Valid @RequestBody BandInsertDTO dto) {
        BandReadOnlyDTO createdBand = bandService.createBand(dto);

        URI location = URI.create("/api/bands/" + createdBand.id());

        return ResponseEntity
                .created(location)
                .body(createdBand);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BandReadOnlyDTO> getBandById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                bandService.getBandById(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<BandReadOnlyDTO>> getAllBands() {
        return ResponseEntity.ok(
                bandService.getAllBands()
        );
    }

}
