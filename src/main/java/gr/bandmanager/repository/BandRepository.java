package gr.bandmanager.repository;

import gr.bandmanager.model.Band;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BandRepository extends JpaRepository<Band, UUID> {

    List<Band> findByNameContainingIgnoreCase(String name);
}
