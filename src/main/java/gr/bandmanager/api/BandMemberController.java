package gr.bandmanager.api;

import gr.bandmanager.dto.BandMemberInsertDTO;
import gr.bandmanager.dto.BandMemberReadOnlyDTO;
import gr.bandmanager.dto.BandMemberUpdateDTO;
import gr.bandmanager.service.IBandMemberService;
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
@RequestMapping("/api/band-members")
@RequiredArgsConstructor
@Tag(
        name = "Band Members",
        description = "Endpoints for managing band members"
)
public class BandMemberController {

    private final IBandMemberService bandMemberService;

    @Operation(
            summary = "Add a band member",
            description = "Adds a new member to a band. Only the band owner is allowed"
    )
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

    @Operation(
            summary = "Get band member by ID",
            description = "Returns a band member if the current user belongs to the same band"
    )
    @GetMapping("/{id}")
    public ResponseEntity<BandMemberReadOnlyDTO> getBandMemberById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                bandMemberService.getBandMemberById(id)
        );
    }

    @Operation(
            summary = "Get band members",
            description = "Returns all members of a band if the current user belongs to it"
    )
    @GetMapping("/band/{bandId}")
    public ResponseEntity<List<BandMemberReadOnlyDTO>> getBandMembersByBandId(
            @PathVariable UUID bandId
    ) {
        return ResponseEntity.ok(
                bandMemberService.getBandMembersByBandId(bandId)
        );
    }

    @Operation(
            summary = "Update a band member",
            description = "Updates a band member. Only the band owner is allowed"
    )
    @PutMapping("/{id}")
    public ResponseEntity<BandMemberReadOnlyDTO> updateBandMember(
            @PathVariable UUID id,
            @Valid @RequestBody BandMemberUpdateDTO dto
    ) {
        return ResponseEntity.ok(
                bandMemberService.updateBandMember(id, dto)
        );
    }

    @Operation(
            summary = "Delete a band member",
            description = "Deletes a band member. Only the band owner is allowed"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBandMember(
            @PathVariable UUID id
    ) {
        bandMemberService.deleteBandMember(id);

        return ResponseEntity.noContent().build();
    }
}