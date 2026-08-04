package gr.bandmanager.service;

import gr.bandmanager.dto.AuthResponseDTO;
import gr.bandmanager.dto.UserLoginDTO;
import gr.bandmanager.dto.UserRegisterDTO;

/**
 * Defines the authentication operations of the application.
 *
 * <p>It supports new user registration and login, returning
 * authentication data that includes a JWT token.</p>
 */
public interface IAuthenticationService {

    /**
     * Registers a new application user.
     *
     * @param dto the registration data
     * @return the authentication response containing the generated JWT token
     */
    AuthResponseDTO register(UserRegisterDTO dto);

    /**
     * Authenticates an existing user.
     *
     * @param dto the user's login credentials
     * @return the authentication response containing the generated JWT token
     */
    AuthResponseDTO login(UserLoginDTO dto);
}
