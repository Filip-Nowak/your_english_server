package org.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceModel {
    private String word;
    private List<String> meanings;
    private String wordBaseName;
}
