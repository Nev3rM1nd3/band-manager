package gr.bandmanager.model;

import gr.bandmanager.model.enums.SongStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "songs")
@Getter
@Setter
@NoArgsConstructor
public class Song extends AbstractEntity {

    @NotBlank
    @Size(max = 150)
    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @NotBlank
    @Size(max = 150)
    @Column(name = "artist", nullable = false, length = 150)
    private String artist;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "song_status", nullable = false)
    private SongStatus songStatus = SongStatus.LEARNING;

    @Size(max = 2000)
    @Column(name = "notes", length = 2000)
    private String notes;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "band_id", nullable = false)
    private Band band;
}
