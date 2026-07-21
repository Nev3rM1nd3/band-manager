package gr.bandmanager.repository;

import gr.bandmanager.model.Rehearsal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface RehearsalRepository extends JpaRepository<Rehearsal, UUID> {

    List<Rehearsal> findByBandId(UUID bandId);

    List<Rehearsal> findByBandIdOrderByStartsAtAsc(UUID bandId);

    List<Rehearsal> findByBandIdAndStartsAtAfterOrderByStartsAtAsc(
            UUID bandId,
            Instant startsAt
    );
}
