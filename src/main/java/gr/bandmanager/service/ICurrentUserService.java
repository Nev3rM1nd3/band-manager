package gr.bandmanager.service;

import gr.bandmanager.model.User;

/**
 * Provides access to the currently authenticated application user.
 */
public interface ICurrentUserService {

    /**
     * Returns the user associated with the current authentication context.
     *
     * @return the currently authenticated user
     */
    User getCurrentUser();
}