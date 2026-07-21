package gr.bandmanager.repository;

import gr.bandmanager.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SongRepository extends JpaRepository<Song, UUID> {

    List<Song> findByBandId(UUID bandId);

    List<Song> findByBandIdAndTitleContainingIgnoreCase(UUID bandId, String title);
}
