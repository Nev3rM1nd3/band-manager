package gr.bandmanager.mapper;

import gr.bandmanager.dto.*;
import gr.bandmanager.model.Band;
import gr.bandmanager.model.BandMember;
import gr.bandmanager.model.Song;
import gr.bandmanager.model.User;
import gr.bandmanager.model.enums.ApplicationRole;
import org.springframework.stereotype.Component;

import java.util.Set;

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

    public void updateSongFromDTO(SongUpdateDTO dto, Song song) {
        song.setTitle(dto.title());
        song.setArtist(dto.artist());
        song.setSongStatus(dto.songStatus());
        song.setNotes(dto.notes());
        song.setBpm(dto.bpm());
        song.setSongKey(dto.songKey());
        song.setDurationSeconds(dto.durationSeconds());
    }

    public User mapToUserEntity(UserRegisterDTO dto) {
        User user = new User();
        user.setFirstname(dto.firstname());
        user.setLastname(dto.lastname());
        user.setEmail(dto.email());
        user.setPassword(dto.password());
        user.setApplicationRole(ApplicationRole.ROLE_USER);
        user.setEnabled(true);
        return user;
    }

    public UserReadOnlyDTO mapToUserReadOnlyDTO(User user) {
        return new UserReadOnlyDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getApplicationRole(),
                user.isEnabled()
        );
    }

    public BandMember mapToBandMemberEntity(
            BandMemberInsertDTO dto,
            Band band,
            User user
    ) {
        BandMember bandMember = new BandMember();

        bandMember.setFirstname(dto.firstname());
        bandMember.setLastname(dto.lastname());
        bandMember.setPosition(dto.position());
        bandMember.setBandRole(dto.bandRole());
        bandMember.setBand(band);
        bandMember.setUser(user);

        if (dto.instruments() != null) {
            dto.instruments().forEach(bandMember::addInstrument);
        }

        return bandMember;
    }

    public BandMemberReadOnlyDTO mapToBandMemberReadOnlyDTO(
            BandMember bandMember
    ) {
        User user = bandMember.getUser();

        return new BandMemberReadOnlyDTO(
                bandMember.getId(),
                bandMember.getFirstname(),
                bandMember.getLastname(),
                bandMember.getPosition(),
                Set.copyOf(bandMember.getInstruments()),
                bandMember.getBandRole(),

                bandMember.getBand().getId(),
                bandMember.getBand().getName(),

                user != null ? user.getId() : null,
                user != null ? user.getEmail() : null,

                bandMember.getCreatedAt(),
                bandMember.getUpdatedAt()
        );
    }

    public void updateBandMemberFromDTO(
            BandMemberUpdateDTO dto,
            BandMember bandMember
    ) {
        bandMember.setFirstname(dto.firstname());
        bandMember.setLastname(dto.lastname());
        bandMember.setPosition(dto.position());
        bandMember.setBandRole(dto.bandRole());

        bandMember.getInstruments().clear();

        if (dto.instruments() != null) {
            dto.instruments().forEach(bandMember::addInstrument);
        }
    }
}