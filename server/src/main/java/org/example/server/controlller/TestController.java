package org.example.server.controlller;

import lombok.RequiredArgsConstructor;
import org.example.server.security.UserSession;
import org.example.server.service.UserService;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@CrossOrigin(origins = {"${CROSS_ORIGIN_URL}"}, allowCredentials = "true")
@org.springframework.web.bind.annotation.RestController
public class TestController {
    private final UserService userService;
    private final UserSession userSession;

    @GetMapping("/api/test/test")
    public String test() {
        return "test";
    }

    @GetMapping("/api/sec")
    public String sec() {
        return "secured data";
    }

    @GetMapping("/api/email")
    public String email(@RequestHeader(name = "Authorization") String header) {
        return userService.getUserByHeader(header).getUsername();
    }

    @GetMapping("/api/session")
    public String session(@RequestHeader(name = "Authorization") String header) {
//        return userSession.getValue();
        return null;
    }

    @GetMapping("/api/session/{value}")
    public String session(@RequestHeader(name = "Authorization") String header, @PathVariable String value) {
//        userSession .setValue(value);
        return "session value set to " + value;
    }
}
