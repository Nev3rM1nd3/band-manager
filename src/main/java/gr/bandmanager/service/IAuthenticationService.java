package gr.bandmanager.service;

import gr.bandmanager.dto.AuthResponseDTO;
import gr.bandmanager.dto.UserLoginDTO;
import gr.bandmanager.dto.UserRegisterDTO;

public interface IAuthenticationService {

    AuthResponseDTO register(UserRegisterDTO dto);

    AuthResponseDTO login(UserLoginDTO dto);
}
