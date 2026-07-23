package gr.bandmanager.service;

import gr.bandmanager.dto.AuthResponseDTO;
import gr.bandmanager.dto.UserLoginDTO;
import gr.bandmanager.dto.UserRegisterDTO;
import gr.bandmanager.mapper.Mapper;
import gr.bandmanager.model.User;
import gr.bandmanager.repository.UserRepository;
import gr.bandmanager.security.CustomUserDetailsService;
import gr.bandmanager.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements IAuthenticationService {

    private final UserRepository userRepository;
    private final Mapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtService jwtService;

    @Override
    @Transactional
    public AuthResponseDTO register(UserRegisterDTO dto) {

        if (userRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException(
                    "Email already registered: " + dto.email()
            );
        }

        User user = mapper.mapToUserEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.password()));

        User savedUser = userRepository.save(user);

        UserDetails userDetails =
                customUserDetailsService.loadUserByUsername(savedUser.getEmail());

        String token = jwtService.generateToken(userDetails);

        return new AuthResponseDTO(token);
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponseDTO login(UserLoginDTO dto) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.email(),
                        dto.password()
                )
        );

        UserDetails userDetails =
                customUserDetailsService.loadUserByUsername(dto.email());

        String token = jwtService.generateToken(userDetails);

        return new AuthResponseDTO(token);
    }
}