package gr.bandmanager.service;

import java.util.UUID;

/**
 * Provides authorization checks for access to band-related resources.
 *
 * <p>The checks are based on the currently authenticated user and the
 * user's membership role in the requested band.</p>
 */

public interface IBandAccessService {

    /**
     * Checks whether the currently authenticated user is a member
     * of the specified band.
     *
     * @param bandId the ID of the band
     * @return {@code true} if the current user belongs to the band,
     *         otherwise {@code false}
     */
    boolean isCurrentUserMemberOfBand(UUID bandId);

    /**
     * Checks whether the currently authenticated user is an owner
     * of the specified band.
     *
     * @param bandId the ID of the band
     * @return {@code true} if the current user has the OWNER role
     *         in the band, otherwise {@code false}
     */
    boolean isCurrentUserOwnerOfBand(UUID bandId);
}