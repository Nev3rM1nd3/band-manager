package gr.bandmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "rehearsals")
@Getter
@Setter
@NoArgsConstructor
public class Rehearsal extends AbstractEntity {

    @NotNull
    @Column(name = "starts_at", nullable = false)
    private Instant startsAt;

    @Column(name = "ends_at")
    private Instant endsAt;

    @NotBlank
    @Size(max = 255)
    @Column(name = "location", nullable = false, length = 255)
    private String location;

    @Size(max = 2000)
    @Column(name = "notes", length = 2000)
    private String notes;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "band_id", nullable = false)
    private Band band;
}
