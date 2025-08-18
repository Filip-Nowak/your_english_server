package org.example.server.security.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangePasswordRequest {
    private String username;
    private String password;
    private String newPassword;
}
