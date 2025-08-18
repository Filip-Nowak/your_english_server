package org.example.server.security;

import jakarta.annotation.PreDestroy;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Data
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserSession implements Serializable {
    private SessionData data;
    private final HttpSession httpSession;
    @Autowired
    public UserSession(HttpSession httpSession) {
        this.httpSession = httpSession;
        System.out.println("UserSession created "+httpSession.getId());
    }
}
