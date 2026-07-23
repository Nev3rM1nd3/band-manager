package gr.bandmanager.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegisterDTO (

        @NotBlank
        @Size(max = 50)
        String firstname,

        @NotBlank
        @Size(max = 50)
        String lastname,

        @NotBlank
        @Email
        @Size(max = 255)
        String email,

        @NotBlank
        @Size(min = 8, max = 100)
        String password
) {
}
