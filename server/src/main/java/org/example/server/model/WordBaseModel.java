package org.example.server.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.List;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor

public class WordBaseModel {
    @Length(min = 1, max = 30, message = "Name must be between 1 and 30 characters" )
    @NotBlank(message = "Name is required")
    private String name;
    private List<RelationModel> relations;
}
