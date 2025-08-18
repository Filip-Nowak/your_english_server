package org.example.server.security;

import org.springframework.security.core.GrantedAuthority;

public class SimpleGrantedAuthority implements GrantedAuthority {
    public SimpleGrantedAuthority(String authority) {
        this.authority = authority;
    }
    private String authority;
    @Override
    public String getAuthority() {
        return authority;
    }

}
