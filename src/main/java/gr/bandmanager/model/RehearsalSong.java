package gr.bandmanager.model;

import gr.bandmanager.model.enums.RehearsalSongStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rehearsal_songs")
@Getter
@Setter
@NoArgsConstructor
public class RehearsalSong extends AbstractEntity {

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "rehearsal_id", nullable = false)
    private Rehearsal rehearsal;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "song_id", nullable = false)
    private Song song;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "rehearsal_song_status", nullable = false)
    private RehearsalSongStatus rehearsalSongStatus;

    @Size(max = 2000)
    @Column(name = "notes", length = 2000)
    private String notes;
}
