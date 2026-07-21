package gr.bandmanager.model;

import gr.bandmanager.model.enums.BandRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "band_members")
@Getter
@Setter
@NoArgsConstructor
public class BandMember extends AbstractEntity {

    @NotBlank
    @Size(max = 50)
    @Column(name = "firstname", nullable = false, length = 50)
    private String firstname;

    @NotBlank
    @Size(max = 50)
    @Column(name = "lastname", nullable = false, length = 50)
    private String lastname;

    @NotBlank
    @Size(max = 50)
    @Column(name = "position", nullable = false, length = 50)
    private String position;

    @Setter(AccessLevel.NONE)
    @ElementCollection
    @CollectionTable(
            name = "band_member_instruments",
            joinColumns = @JoinColumn(name = "band_member_id")
    )
    @Column(name = "instrument", nullable = false, length = 50)
    private Set<String> instruments = new HashSet<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "band_role", nullable = false)
    private BandRole bandRole;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "band_id", nullable = false)
    private Band band;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void addInstrument(String instrument) {
        instruments.add(instrument);
    }

    public void removeInstrument(String instrument) {
        instruments.remove(instrument);
    }
}
