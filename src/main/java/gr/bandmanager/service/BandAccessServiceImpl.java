package gr.bandmanager.service;

import gr.bandmanager.model.User;
import gr.bandmanager.model.enums.BandRole;
import gr.bandmanager.repository.BandMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BandAccessServiceImpl implements IBandAccessService {

    private final BandMemberRepository bandMemberRepository;
    private final ICurrentUserService currentUserService;

    @Override
    public boolean isCurrentUserMemberOfBand(UUID bandId) {

        User currentUser = currentUserService.getCurrentUser();

        return bandMemberRepository.existsByBandIdAndUserId(
                bandId,
                currentUser.getId()
        );
    }

    @Override
    public boolean isCurrentUserOwnerOfBand(UUID bandId) {

        User currentUser = currentUserService.getCurrentUser();

        return bandMemberRepository.existsByBandIdAndUserIdAndBandRole(
                bandId,
                currentUser.getId(),
                BandRole.OWNER
        );
    }
}