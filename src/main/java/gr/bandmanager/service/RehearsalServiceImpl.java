package gr.bandmanager.service;

import gr.bandmanager.dto.RehearsalInsertDTO;
import gr.bandmanager.dto.RehearsalReadOnlyDTO;
import gr.bandmanager.dto.RehearsalUpdateDTO;
import gr.bandmanager.exception.BandAccessDeniedException;
import gr.bandmanager.exception.BandNotFoundException;
import gr.bandmanager.exception.RehearsalNotFoundException;
import gr.bandmanager.mapper.Mapper;
import gr.bandmanager.model.Band;
import gr.bandmanager.model.Rehearsal;
import gr.bandmanager.repository.BandRepository;
import gr.bandmanager.repository.RehearsalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RehearsalServiceImpl implements IRehearsalService {

    private final RehearsalRepository rehearsalRepository;
    private final BandRepository bandRepository;
    private final Mapper mapper;
    private final IBandAccessService bandAccessService;

    @Override
    @Transactional
    public RehearsalReadOnlyDTO createRehearsal(RehearsalInsertDTO dto) {

        Band band = bandRepository.findById(dto.bandId())
                .orElseThrow(() -> new BandNotFoundException(dto.bandId()));

        if (!bandAccessService.isCurrentUserOwnerOfBand(dto.bandId())) {
            throw new BandAccessDeniedException();
        }

        Rehearsal rehearsal =
                mapper.mapToRehearsalEntity(dto, band);

        Rehearsal savedRehearsal =
                rehearsalRepository.save(rehearsal);

        return mapper.mapToRehearsalReadOnlyDTO(savedRehearsal);
    }

    @Override
    @Transactional(readOnly = true)
    public RehearsalReadOnlyDTO getRehearsalById(UUID id) {

        Rehearsal rehearsal = rehearsalRepository.findById(id)
                .orElseThrow(() -> new RehearsalNotFoundException(id));

        if (!bandAccessService.isCurrentUserMemberOfBand(
                rehearsal.getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        return mapper.mapToRehearsalReadOnlyDTO(rehearsal);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RehearsalReadOnlyDTO> getRehearsalsByBandId(UUID bandId) {

        if (!bandAccessService.isCurrentUserMemberOfBand(bandId)) {
            throw new BandAccessDeniedException();
        }

        return rehearsalRepository.findByBandIdOrderByStartsAtAsc(bandId)
                .stream()
                .map(mapper::mapToRehearsalReadOnlyDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RehearsalReadOnlyDTO> getUpcomingRehearsalsByBandId(
            UUID bandId
    ) {
        if (!bandAccessService.isCurrentUserMemberOfBand(bandId)) {
            throw new BandAccessDeniedException();
        }

        return rehearsalRepository
                .findByBandIdAndStartsAtAfterOrderByStartsAtAsc(
                        bandId,
                        Instant.now()
                )
                .stream()
                .map(mapper::mapToRehearsalReadOnlyDTO)
                .toList();
    }

    @Override
    @Transactional
    public RehearsalReadOnlyDTO updateRehearsal(
            UUID id,
            RehearsalUpdateDTO dto
    ) {
        Rehearsal rehearsal = rehearsalRepository.findById(id)
                .orElseThrow(() -> new RehearsalNotFoundException(id));

        if (!bandAccessService.isCurrentUserOwnerOfBand(
                rehearsal.getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        mapper.updateRehearsalFromDTO(dto, rehearsal);

        Rehearsal updatedRehearsal =
                rehearsalRepository.save(rehearsal);

        return mapper.mapToRehearsalReadOnlyDTO(updatedRehearsal);
    }

    @Override
    @Transactional
    public void deleteRehearsal(UUID id) {

        Rehearsal rehearsal = rehearsalRepository.findById(id)
                .orElseThrow(() -> new RehearsalNotFoundException(id));

        if (!bandAccessService.isCurrentUserOwnerOfBand(
                rehearsal.getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        rehearsalRepository.delete(rehearsal);
    }
}