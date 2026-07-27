package gr.bandmanager.api;

import gr.bandmanager.dto.BandMemberInsertDTO;
import gr.bandmanager.dto.BandMemberReadOnlyDTO;
import gr.bandmanager.dto.BandMemberUpdateDTO;
import gr.bandmanager.service.IBandMemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/band-members")
@RequiredArgsConstructor
public class BandMemberController {

    private final IBandMemberService bandMemberService;

    @PostMapping
    public ResponseEntity<BandMemberReadOnlyDTO> createBandMember(
            @Valid @RequestBody BandMemberInsertDTO dto
    ) {
        BandMemberReadOnlyDTO createdBandMember =
                bandMemberService.createBandMember(dto);

        URI location = URI.create(
                "/api/band-members/" + createdBandMember.id()
        );

        return ResponseEntity
                .created(location)
                .body(createdBandMember);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BandMemberReadOnlyDTO> getBandMemberById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                bandMemberService.getBandMemberById(id)
        );
    }

    @GetMapping("/band/{bandId}")
    public ResponseEntity<List<BandMemberReadOnlyDTO>> getBandMembersByBandId(
            @PathVariable UUID bandId
    ) {
        return ResponseEntity.ok(
                bandMemberService.getBandMembersByBandId(bandId)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<BandMemberReadOnlyDTO> updateBandMember(
            @PathVariable UUID id,
            @Valid @RequestBody BandMemberUpdateDTO dto
    ) {
        return ResponseEntity.ok(
                bandMemberService.updateBandMember(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBandMember(
            @PathVariable UUID id
    ) {
        bandMemberService.deleteBandMember(id);

        return ResponseEntity.noContent().build();
    }
}