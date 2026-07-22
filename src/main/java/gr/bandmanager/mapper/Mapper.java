package gr.bandmanager.mapper;

import gr.bandmanager.dto.BandInsertDTO;
import gr.bandmanager.dto.BandReadOnlyDTO;
import gr.bandmanager.dto.BandUpdateDTO;
import gr.bandmanager.model.Band;
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
}