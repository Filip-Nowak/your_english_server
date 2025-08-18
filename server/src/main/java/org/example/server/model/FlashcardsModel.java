package org.example.server.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class FlashcardsModel {
    private List<RelationModel> words;
    private int max;
    private boolean newSet;
}
