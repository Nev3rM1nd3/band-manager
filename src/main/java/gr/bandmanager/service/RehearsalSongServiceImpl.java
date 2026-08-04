package gr.bandmanager.service;

import gr.bandmanager.dto.RehearsalSongInsertDTO;
import gr.bandmanager.dto.RehearsalSongReadOnlyDTO;
import gr.bandmanager.dto.RehearsalSongUpdateDTO;
import gr.bandmanager.exception.*;
import gr.bandmanager.mapper.Mapper;
import gr.bandmanager.model.Rehearsal;
import gr.bandmanager.model.RehearsalSong;
import gr.bandmanager.model.Song;
import gr.bandmanager.repository.RehearsalRepository;
import gr.bandmanager.repository.RehearsalSongRepository;
import gr.bandmanager.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RehearsalSongServiceImpl implements IRehearsalSongService {

    private final RehearsalSongRepository rehearsalSongRepository;
    private final RehearsalRepository rehearsalRepository;
    private final SongRepository songRepository;
    private final Mapper mapper;
    private final IBandAccessService bandAccessService;

    @Override
    @Transactional
    public RehearsalSongReadOnlyDTO createRehearsalSong(
            RehearsalSongInsertDTO dto
    ) {
        Rehearsal rehearsal = rehearsalRepository.findById(dto.rehearsalId())
                .orElseThrow(() -> new RehearsalNotFoundException(dto.rehearsalId()));

        if (!bandAccessService.isCurrentUserOwnerOfBand(
                rehearsal.getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        Song song = songRepository.findById(dto.songId())
                .orElseThrow(() ->
                        new SongNotFoundException(dto.songId())
                );

        if (!rehearsal.getBand().getId().equals(song.getBand().getId())) {
            throw new SongDoesNotBelongToRehearsalBandException();
        }

        if (rehearsalSongRepository.existsByRehearsalIdAndSongId(
                dto.rehearsalId(),
                dto.songId()
        )) {
            throw new RehearsalSongAlreadyExistsException();
        }

        RehearsalSong rehearsalSong =
                mapper.mapToRehearsalSongEntity(dto, rehearsal, song);

        RehearsalSong savedRehearsalSong =
                rehearsalSongRepository.save(rehearsalSong);

        return mapper.mapToRehearsalSongReadOnlyDTO(savedRehearsalSong);
    }

    @Override
    @Transactional(readOnly = true)
    public RehearsalSongReadOnlyDTO getRehearsalSongById(UUID id) {

        RehearsalSong rehearsalSong = rehearsalSongRepository.findById(id)
                .orElseThrow(() -> new RehearsalSongNotFoundException(id));

        if (!bandAccessService.isCurrentUserMemberOfBand(
                rehearsalSong.getRehearsal().getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        return mapper.mapToRehearsalSongReadOnlyDTO(rehearsalSong);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RehearsalSongReadOnlyDTO> getRehearsalSongsByRehearsalId(
            UUID rehearsalId
    ) {
        Rehearsal rehearsal = rehearsalRepository.findById(rehearsalId)
            .orElseThrow(() -> new RehearsalNotFoundException(rehearsalId));

        if (!bandAccessService.isCurrentUserMemberOfBand(
                rehearsal.getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        return rehearsalSongRepository.findByRehearsalId(rehearsalId)
                .stream()
                .map(mapper::mapToRehearsalSongReadOnlyDTO)
                .toList();
    }

    @Override
    @Transactional
    public RehearsalSongReadOnlyDTO updateRehearsalSong(
            UUID id,
            RehearsalSongUpdateDTO dto
    ) {
        RehearsalSong rehearsalSong = rehearsalSongRepository.findById(id)
                .orElseThrow(() -> new RehearsalSongNotFoundException(id));

        if (!bandAccessService.isCurrentUserOwnerOfBand(
                rehearsalSong.getRehearsal().getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        mapper.updateRehearsalSongFromDTO(dto, rehearsalSong);

        RehearsalSong updatedRehearsalSong =
                rehearsalSongRepository.save(rehearsalSong);

        return mapper.mapToRehearsalSongReadOnlyDTO(updatedRehearsalSong);
    }

    @Override
    @Transactional
    public void deleteRehearsalSong(UUID id) {

        RehearsalSong rehearsalSong = rehearsalSongRepository.findById(id)
                .orElseThrow(() -> new RehearsalSongNotFoundException(id));

        if (!bandAccessService.isCurrentUserOwnerOfBand(
                rehearsalSong.getRehearsal().getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        rehearsalSongRepository.delete(rehearsalSong);
    }
}