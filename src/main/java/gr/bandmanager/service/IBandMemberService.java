package gr.bandmanager.service;

import gr.bandmanager.dto.BandMemberInsertDTO;
import gr.bandmanager.dto.BandMemberReadOnlyDTO;
import gr.bandmanager.dto.BandMemberUpdateDTO;

import java.util.List;
import java.util.UUID;

public interface IBandMemberService {

    BandMemberReadOnlyDTO createBandMember(BandMemberInsertDTO dto);

    BandMemberReadOnlyDTO getBandMemberById(UUID id);

    List<BandMemberReadOnlyDTO> getBandMembersByBandId(UUID bandId);

    BandMemberReadOnlyDTO updateBandMember(
            UUID id,
            BandMemberUpdateDTO dto
    );

    void deleteBandMember(UUID id);
}