package gr.bandmanager.service;

import gr.bandmanager.dto.RehearsalInsertDTO;
import gr.bandmanager.dto.RehearsalReadOnlyDTO;
import gr.bandmanager.dto.RehearsalUpdateDTO;

import java.util.List;
import java.util.UUID;

public interface IRehearsalService {

    RehearsalReadOnlyDTO createRehearsal(RehearsalInsertDTO dto);

    RehearsalReadOnlyDTO getRehearsalById(UUID id);

    List<RehearsalReadOnlyDTO> getRehearsalsByBandId(UUID bandId);

    List<RehearsalReadOnlyDTO> getUpcomingRehearsalsByBandId(
            UUID bandId
    );

    RehearsalReadOnlyDTO updateRehearsal(
            UUID id,
            RehearsalUpdateDTO dto
    );

    void deleteRehearsal(UUID id);
}