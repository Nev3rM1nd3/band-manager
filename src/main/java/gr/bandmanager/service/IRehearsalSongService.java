package gr.bandmanager.service;

import gr.bandmanager.dto.RehearsalSongInsertDTO;
import gr.bandmanager.dto.RehearsalSongReadOnlyDTO;
import gr.bandmanager.dto.RehearsalSongUpdateDTO;

import java.util.List;
import java.util.UUID;

public interface IRehearsalSongService {

    RehearsalSongReadOnlyDTO createRehearsalSong(
            RehearsalSongInsertDTO dto
    );

    RehearsalSongReadOnlyDTO getRehearsalSongById(UUID id);

    List<RehearsalSongReadOnlyDTO> getRehearsalSongsByRehearsalId(
            UUID rehearsalId
    );

    RehearsalSongReadOnlyDTO updateRehearsalSong(
            UUID id,
            RehearsalSongUpdateDTO dto
    );

    void deleteRehearsalSong(UUID id);
}