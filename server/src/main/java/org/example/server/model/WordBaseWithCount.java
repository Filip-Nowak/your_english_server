package org.example.server.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WordBaseWithCount {
    private String name;
    private int wordCount;
}
