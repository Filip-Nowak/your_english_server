package org.example.server.mapper;

import org.example.server.entity.WordBase;
import org.example.server.model.WordBaseModel;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface WordBaseMapper {
    WordBaseModel toModel(WordBase wordBase);
    WordBase toEntity(WordBaseModel wordBaseModel);

    List<WordBaseModel> toModels(List<WordBase> wordBases);
}
