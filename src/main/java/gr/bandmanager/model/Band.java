package gr.bandmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "bands")
@Getter
@Setter
@NoArgsConstructor
public class Band extends AbstractEntity {

    @NotBlank
    @Size(max = 100)
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Size(max = 1000)
    @Column(name = "description", length = 1000)
    private String description;

    @ElementCollection
    @CollectionTable(
            name = "band_genres",
            joinColumns = @JoinColumn(name = "band_id")
    )
    @Column(name = "genre", nullable = false, length = 50)
    private Set<String> genres = new HashSet<>();

    public void addGenre(String genre) {
        genres.add(genre);
    }

    public void removeGenre(String genre) {
        genres.remove(genre);
    }
}
