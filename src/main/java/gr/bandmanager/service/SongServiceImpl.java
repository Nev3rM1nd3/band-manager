package gr.bandmanager.service;

import gr.bandmanager.dto.SongInsertDTO;
import gr.bandmanager.dto.SongReadOnlyDTO;
import gr.bandmanager.exception.BandNotFoundException;
import gr.bandmanager.exception.SongNotFoundException;
import gr.bandmanager.mapper.Mapper;
import gr.bandmanager.model.Band;
import gr.bandmanager.model.Song;
import gr.bandmanager.repository.BandRepository;
import gr.bandmanager.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements ISongService {

    private final SongRepository songRepository;
    private final BandRepository bandRepository;
    private final Mapper mapper;

    @Override
    @Transactional
    public SongReadOnlyDTO createSong(SongInsertDTO dto) {
        Band band = bandRepository.findById(dto.bandId())
                .orElseThrow(() -> new BandNotFoundException(dto.bandId()));

        Song song = mapper.mapToSongEntity(dto, band);
        Song savedSong = songRepository.save(song);

        return mapper.mapToSongReadOnlyDTO(savedSong);
    }

    @Override
    @Transactional(readOnly = true)
    public SongReadOnlyDTO getSongById(UUID id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new SongNotFoundException(id));

        return mapper.mapToSongReadOnlyDTO(song);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SongReadOnlyDTO> getSongsByBandId(UUID bandId) {
        return songRepository.findByBandId(bandId)
                .stream()
                .map(mapper::mapToSongReadOnlyDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<SongReadOnlyDTO> searchSongsByTitle(UUID bandId, String title) {
        return songRepository
                .findByBandIdAndTitleContainingIgnoreCase(bandId, title)
                .stream()
                .map(mapper::mapToSongReadOnlyDTO)
                .toList();
    }
}
