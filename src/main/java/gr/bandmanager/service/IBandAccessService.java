package gr.bandmanager.service;

import java.util.UUID;

public interface IBandAccessService {

    boolean isCurrentUserMemberOfBand(UUID bandId);

    boolean isCurrentUserOwnerOfBand(UUID bandId);
}