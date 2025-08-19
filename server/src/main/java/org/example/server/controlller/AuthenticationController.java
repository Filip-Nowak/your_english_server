package org.example.server.controlller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.model.RegisterResponse;
import org.example.server.model.ResponseModel;
import org.example.server.security.auth.*;
import org.example.server.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://srv40.mikr.us:20172"}, allowCredentials = "true")

@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        RegisterResponse response;
        try {
            response = authenticationService.register(request);
        } catch (RuntimeException e) {
            return ResponseEntity.ok(RegisterResponse.builder()
                    .errors(e.getMessage())
                    .build());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody @Valid AuthenticationRequest request
    ) {
        System.out.println("authenticating");
        AuthenticationResponse response;
        try{
            response=authenticationService.authenticate(request);
        }catch (RuntimeException e){
            return ResponseEntity.ok(AuthenticationResponse.builder()
                    .errors("wrong credentials")
                    .build());
        }
        return ResponseEntity.ok(response);

    }
    @GetMapping("/logout/success")
    public ResponseEntity<ResponseModel> logout(){
        return ResponseEntity.ok(ResponseModel.builder()
                .message("logout success")
                .build());
    }
    @GetMapping("/test")
    public ResponseEntity<ResponseModel> test(){
        return ResponseEntity.ok(ResponseModel.builder()
                .message("test success")
                .build());
    }

    @PostMapping("/change/username")
    public ResponseEntity<ResponseModel> changeUsername(
            @RequestHeader(name = "Authorization") String header,
            @RequestBody AuthenticationRequest request
    ) {
        try {
            User user = userService.getUserByHeader(header);
            if(user == null) {
                return ResponseEntity.ok(ResponseModel.builder()
                        .error(true)
                        .message("User not found")
                        .build());
            }
            System.out.println(request);
            authenticationService.changeUsername(request.getUsername(), request.getPassword(),user);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message(e.getMessage())
                    .build());
        }
        return ResponseEntity.ok(ResponseModel.builder()
                .message("Username changed successfully")
                .build());
    }
    @PostMapping("/change/password")
    public ResponseEntity<ResponseModel> changePassword(
            @RequestHeader(name = "Authorization") String header,
            @RequestBody ChangePasswordRequest request
    ) {
        try {
            User user = userService.getUserByHeader(header);
            if(user == null) {
                return ResponseEntity.ok(ResponseModel.builder()
                        .error(true)
                        .message("User not found")
                        .build());
            }
            authenticationService.changePassword(request.getNewPassword(),request.getPassword(),request.getUsername(), user);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message(e.getMessage())
                    .build());
        }
        return ResponseEntity.ok(ResponseModel.builder()
                .message("Password changed successfully")
                .build());
    }

    @PostMapping("/delete/account")
    public ResponseEntity<ResponseModel> deleteAccount(
            @RequestHeader(name = "Authorization") String header,
            @RequestBody AuthenticationRequest request
    ) {
        try {
            User user = userService.getUserByHeader(header);
            if(user == null) {
                return ResponseEntity.ok(ResponseModel.builder()
                        .error(true)
                        .message("User not found")
                        .build());
            }
            authenticationService.deleteAccount(request.getUsername(), request.getPassword(), user);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message(e.getMessage())
                    .build());
        }
        return ResponseEntity.ok(ResponseModel.builder()
                .message("Account deleted successfully")
                .build());
    }


}
