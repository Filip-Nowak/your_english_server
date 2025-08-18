package org.example.server.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class AddRelationModel {
    private String wordBaseName;
    @Length(min = 1, max = 100, message = "Word must be between 1 and 100 characters")
    @NotBlank(message = "Word is required")
    private String word;
    @Length(min = 1, max = 100, message = "Meaning must be between 1 and 10" +
            "0 characters")
    @NotBlank(message = "Meaning is required")
    private String meaning;
}
