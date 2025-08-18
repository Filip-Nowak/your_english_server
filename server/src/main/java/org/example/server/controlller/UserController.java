package org.example.server.controlller;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.model.ProfileModel;
import org.example.server.model.ResponseModel;
import org.example.server.model.UserData;
import org.example.server.model.WordBaseWithCount;
import org.example.server.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://192.168.1.26:3000"}, allowCredentials = "true")
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/user")
    public ResponseEntity<ResponseModel> getUser(@RequestHeader(name = "Authorization") String header) {
        System.out.println("getUser called with header: " + header);
        User user = userService.getUserByHeader(header);
        return ResponseEntity.ok(ResponseModel.builder()
                .data(UserData.builder()
                        .username(user.getUsername())
                        .build())
                .build());
    }

    @GetMapping("/profile")
    public ResponseEntity<ResponseModel> getUserProfile(@RequestHeader(name = "Authorization") String header) {
        User user = userService.getUserByHeader(header);
        if (user == null) {
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("User not found")
                    .build());
        }
        List<WordBaseWithCount> wordBases = user.getWordBases().stream()
                .map(wordBase -> WordBaseWithCount.builder()
                        .name(wordBase.getName())
                        .wordCount(wordBase.getRelations().size())
                        .build())
                .toList();
        return ResponseEntity.ok(ResponseModel.builder()
                .data(
                        ProfileModel.builder()
                                .username(user.getUsername())
                                .wordBases(wordBases)
                                .build()
                )
                .build());
    }
}
