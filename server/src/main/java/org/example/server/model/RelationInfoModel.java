package org.example.server.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RelationInfoModel {
    private String wordBaseName;
    private String word;
    private String meaning;
}
