package gr.bandmanager.service;

import gr.bandmanager.dto.BandMemberInsertDTO;
import gr.bandmanager.dto.BandMemberReadOnlyDTO;
import gr.bandmanager.dto.BandMemberUpdateDTO;
import gr.bandmanager.exception.BandAccessDeniedException;
import gr.bandmanager.exception.BandMemberNotFoundException;
import gr.bandmanager.exception.BandNotFoundException;
import gr.bandmanager.exception.UserNotFoundException;
import gr.bandmanager.mapper.Mapper;
import gr.bandmanager.model.Band;
import gr.bandmanager.model.BandMember;
import gr.bandmanager.model.User;
import gr.bandmanager.repository.BandMemberRepository;
import gr.bandmanager.repository.BandRepository;
import gr.bandmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BandMemberServiceImpl implements IBandMemberService {

    private final BandMemberRepository bandMemberRepository;
    private final BandRepository bandRepository;
    private final UserRepository userRepository;
    private final Mapper mapper;
    private final IBandAccessService bandAccessService;

    @Override
    @Transactional
    public BandMemberReadOnlyDTO createBandMember(BandMemberInsertDTO dto) {

        Band band = bandRepository.findById(dto.bandId())
                .orElseThrow(() -> new BandNotFoundException(dto.bandId()));

        if (!bandAccessService.isCurrentUserOwnerOfBand(dto.bandId())) {
            throw new BandAccessDeniedException();
        }

        User user = null;

        if (dto.userId() != null) {
            user = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new UserNotFoundException(dto.userId()));
        }

        BandMember bandMember =
                mapper.mapToBandMemberEntity(dto, band, user);

        BandMember savedBandMember =
                bandMemberRepository.save(bandMember);

        return mapper.mapToBandMemberReadOnlyDTO(savedBandMember);
    }

    @Override
    @Transactional(readOnly = true)
    public BandMemberReadOnlyDTO getBandMemberById(UUID id) {

        BandMember bandMember = bandMemberRepository.findById(id)
                .orElseThrow(() -> new BandMemberNotFoundException(id));

        if (!bandAccessService.isCurrentUserMemberOfBand(
                bandMember.getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        return mapper.mapToBandMemberReadOnlyDTO(bandMember);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BandMemberReadOnlyDTO> getBandMembersByBandId(UUID bandId) {

        if (!bandAccessService.isCurrentUserMemberOfBand(bandId)) {
            throw new BandAccessDeniedException();
        }

        return bandMemberRepository.findByBandId(bandId)
                .stream()
                .map(mapper::mapToBandMemberReadOnlyDTO)
                .toList();
    }

    @Override
    @Transactional
    public BandMemberReadOnlyDTO updateBandMember(
            UUID id,
            BandMemberUpdateDTO dto
    ) {
        BandMember bandMember = bandMemberRepository.findById(id)
                .orElseThrow(() -> new BandMemberNotFoundException(id));

        if (!bandAccessService.isCurrentUserOwnerOfBand(
                bandMember.getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        mapper.updateBandMemberFromDTO(dto, bandMember);

        BandMember updatedBandMember =
                bandMemberRepository.save(bandMember);

        return mapper.mapToBandMemberReadOnlyDTO(updatedBandMember);
    }

    @Override
    @Transactional
    public void deleteBandMember(UUID id) {

        BandMember bandMember = bandMemberRepository.findById(id)
                .orElseThrow(() -> new BandMemberNotFoundException(id));

        if (!bandAccessService.isCurrentUserOwnerOfBand(
                bandMember.getBand().getId()
        )) {
            throw new BandAccessDeniedException();
        }

        bandMemberRepository.delete(bandMember);
    }
}