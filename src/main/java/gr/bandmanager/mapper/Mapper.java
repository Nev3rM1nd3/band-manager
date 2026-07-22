package gr.bandmanager.mapper;

import gr.bandmanager.dto.*;
import gr.bandmanager.model.Band;
import gr.bandmanager.model.Song;
import org.springframework.stereotype.Component;

@Component
public class Mapper {

    public Band mapToBandEntity(BandInsertDTO dto) {
        Band band = new Band();
        band.setName(dto.name());
        band.setDescription(dto.description());

        if (dto.genres() != null) {
            dto.genres().forEach(band::addGenre);
        }

        return band;
    }

    public BandReadOnlyDTO mapToBandReadOnlyDTO(Band band) {
        return new BandReadOnlyDTO(
                band.getId(),
                band.getName(),
                band.getDescription(),
                band.getGenres(),
                band.getCreatedAt(),
                band.getUpdatedAt()
        );
    }

    public void updateBandFromDTO(BandUpdateDTO dto, Band band) {
        band.setName(dto.name());
        band.setDescription(dto.description());
        band.getGenres().clear();

        if (dto.genres() != null) {
            dto.genres().forEach(band::addGenre);
        }
    }

    public Song mapToSongEntity(SongInsertDTO dto, Band band) {
        Song song = new Song();

        song.setTitle(dto.title());
        song.setArtist(dto.artist());
        song.setSongStatus(dto.songStatus());
        song.setNotes(dto.notes());
        song.setBpm(dto.bpm());
        song.setSongKey(dto.songKey());
        song.setDurationSeconds(dto.durationSeconds());
        song.setBand(band);

        return song;
    }

    public SongReadOnlyDTO mapToSongReadOnlyDTO(Song song) {
        return new SongReadOnlyDTO(
                song.getId(),
                song.getTitle(),
                song.getArtist(),
                song.getSongStatus(),
                song.getNotes(),
                song.getBpm(),
                song.getSongKey(),
                song.getDurationSeconds(),
                song.getBand().getId(),
                song.getBand().getName(),
                song.getCreatedAt(),
                song.getUpdatedAt()
        );
    }
}