package org.example.server.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RegisterResponse {
    private String errors;
    private String token;
}
