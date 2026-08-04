package gr.bandmanager.repository;

import gr.bandmanager.model.BandMember;
import gr.bandmanager.model.enums.BandRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BandMemberRepository extends JpaRepository<BandMember, UUID> {

    List<BandMember> findByBandId(UUID bandId);

    List<BandMember> findByUserId(UUID userId);

    boolean existsByBandIdAndUserId(
            UUID bandId,
            UUID userId
    );

    boolean existsByBandIdAndUserIdAndBandRole(
            UUID bandId,
            UUID userId,
            BandRole bandRole
    );

    long countByBandIdAndBandRole(
            UUID bandId,
            BandRole bandRole
    );
}
