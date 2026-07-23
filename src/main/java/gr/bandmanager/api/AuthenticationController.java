package gr.bandmanager.api;

import gr.bandmanager.dto.AuthResponseDTO;
import gr.bandmanager.dto.UserLoginDTO;
import gr.bandmanager.dto.UserRegisterDTO;
import gr.bandmanager.service.IAuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid @RequestBody UserRegisterDTO dto
    ) {
        AuthResponseDTO response = authenticationService.register(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Valid @RequestBody UserLoginDTO dto
    ) {
        return ResponseEntity.ok(
                authenticationService.login(dto)
        );
    }
}