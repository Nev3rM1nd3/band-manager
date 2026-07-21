package gr.bandmanager.service;

import gr.bandmanager.dto.BandInsertDTO;
import gr.bandmanager.dto.BandReadOnlyDTO;

import java.util.List;
import java.util.UUID;

public interface IBandService {

    BandReadOnlyDTO createBand(BandInsertDTO dto);

    BandReadOnlyDTO getBandById(UUID id);

    List<BandReadOnlyDTO> getAllBands();
}