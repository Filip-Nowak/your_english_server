package org.example.server.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class ProfileModel {
    private String username;
    private List<WordBaseWithCount> wordBases;
}
