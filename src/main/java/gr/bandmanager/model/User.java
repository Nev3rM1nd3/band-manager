package gr.bandmanager.model;

import gr.bandmanager.model.enums.ApplicationRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User extends AbstractEntity {

    @NotBlank
    @Size(max = 50)
    @Column(name = "firstname", nullable = false, length = 50)
    private String firstname;

    @NotBlank
    @Size(max = 50)
    @Column(name = "lastname", nullable = false, length = 50)
    private String lastname;

    @NotBlank
    @Email
    @Size(max = 255)
    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @NotBlank
    @Size(max = 255)
    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "application_role", nullable = false)
    private ApplicationRole applicationRole = ApplicationRole.ROLE_USER;

    @Column(name = "enabled", nullable = false)
    private boolean enabled = true;
}
