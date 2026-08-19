package gr.bandmanager.repository;

import gr.bandmanager.model.RehearsalSong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RehearsalSongRepository extends JpaRepository<RehearsalSong, UUID> {

    List<RehearsalSong> findByRehearsalId(UUID rehearsalId);

    boolean existsByRehearsalIdAndSongId(UUID rehearsalId, UUID songId);

    void deleteAllByRehearsalBandId(UUID bandId);}
