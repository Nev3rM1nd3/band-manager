package gr.bandmanager.service;

import gr.bandmanager.dto.BandInsertDTO;
import gr.bandmanager.dto.BandReadOnlyDTO;
import gr.bandmanager.dto.BandUpdateDTO;
import gr.bandmanager.exception.BandNotFoundException;
import gr.bandmanager.mapper.Mapper;
import gr.bandmanager.model.Band;
import gr.bandmanager.repository.BandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BandServiceImpl implements IBandService {

    private final BandRepository bandRepository;
    private final Mapper mapper;

    @Override
    @Transactional
    public BandReadOnlyDTO createBand(BandInsertDTO dto) {
        Band band = mapper.mapToBandEntity(dto);
        Band savedBand = bandRepository.save(band);

        return mapper.mapToBandReadOnlyDTO(savedBand);
    }

    @Override
    @Transactional(readOnly = true)
    public BandReadOnlyDTO getBandById(UUID id) {
        Band band = bandRepository.findById(id)
                .orElseThrow(() -> new BandNotFoundException(id));
        return mapper.mapToBandReadOnlyDTO(band);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BandReadOnlyDTO> getAllBands() {
        return bandRepository.findAll()
                .stream()
                .map(mapper::mapToBandReadOnlyDTO)
                .toList();
    }

    @Override
    @Transactional
    public BandReadOnlyDTO updateBand(UUID id, BandUpdateDTO dto) {
        Band band = bandRepository.findById(id)
                .orElseThrow(() -> new BandNotFoundException(id));

        mapper.updateBandFromDTO(dto, band);

        Band updatedBand = bandRepository.save(band);

        return mapper.mapToBandReadOnlyDTO(updatedBand);
    }
}