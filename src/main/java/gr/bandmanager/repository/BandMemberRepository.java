package gr.bandmanager.repository;

import gr.bandmanager.model.BandMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BandMemberRepository extends JpaRepository<BandMember, UUID> {

    List<BandMember> findByBandId(UUID bandId);

    List<BandMember> findByUserId(UUID userId);

    List<BandMember> findByUserIsNull();
}
