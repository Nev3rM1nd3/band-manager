package gr.bandmanager.api;

import gr.bandmanager.dto.AuthResponseDTO;
import gr.bandmanager.dto.UserLoginDTO;
import gr.bandmanager.dto.UserRegisterDTO;
import gr.bandmanager.service.IAuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(
        name = "Authentication",
        description = "Endpoints for user registration and login"
)
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @Operation(
            summary = "Register a new user",
            description = "Creates a new user account and returns a JWT token",
            security = {}
    )
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid @RequestBody UserRegisterDTO dto
    ) {
        AuthResponseDTO response = authenticationService.register(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @Operation(
            summary = "Login user",
            description = "Authenticates a user and returns a JWT token",
            security = {}
    )
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Valid @RequestBody UserLoginDTO dto
    ) {
        return ResponseEntity.ok(
                authenticationService.login(dto)
        );
    }
}