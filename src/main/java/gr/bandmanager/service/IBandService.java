package gr.bandmanager.service;

import gr.bandmanager.dto.BandInsertDTO;
import gr.bandmanager.dto.BandReadOnlyDTO;
import gr.bandmanager.dto.BandUpdateDTO;

import java.util.List;
import java.util.UUID;

public interface IBandService {

    BandReadOnlyDTO createBand(BandInsertDTO dto);

    BandReadOnlyDTO getBandById(UUID id);

    List<BandReadOnlyDTO> getAllBands();

    BandReadOnlyDTO updateBand(UUID id, BandUpdateDTO dto);

    void deleteBand(UUID id);

    List<BandReadOnlyDTO> searchBandsByName(String name);
}