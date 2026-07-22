package gr.bandmanager.service;

import gr.bandmanager.dto.SongInsertDTO;
import gr.bandmanager.dto.SongReadOnlyDTO;

import java.util.List;
import java.util.UUID;

public interface ISongService {

    SongReadOnlyDTO createSong(SongInsertDTO dto);

    SongReadOnlyDTO getSongById(UUID id);

    List<SongReadOnlyDTO> getSongsByBandId(UUID bandId);

    List<SongReadOnlyDTO> searchSongsByTitle(UUID bandId, String title);

}
