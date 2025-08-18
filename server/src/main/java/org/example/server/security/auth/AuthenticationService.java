package org.example.server.security.auth;


import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.entity.WordBase;
import org.example.server.model.RegisterResponse;
import org.example.server.repository.UserRepository;
import org.example.server.security.JwtService;
import org.example.server.service.WordBaseService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final WordBaseService wordBaseService;

    public RegisterResponse register(RegisterRequest request) throws RuntimeException{
        if(userRepository.existsByUsername(request.getUsername())){
            System.out.println("Username already exists");
            throw new RuntimeException("Username already exists");
        }
        System.out.println("Registering");
        var user= User.builder()
                .password(passwordEncoder.encode(request.getPassword()))
                .username(request.getUsername())
                .enabled(true)
                .credentialsChangedAt(Instant.now())
                .build();
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return RegisterResponse.builder()
                .errors(null)
                .token(token)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        if(!userRepository.existsByUsername(request.getUsername())){
            System.out.println("User not found");
            throw new RuntimeException("User not found");
        }
        try{
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        }catch (Exception e){
            System.out.println("exception "+e.getMessage());
            throw new RuntimeException("Invalid credentials");
        }
        var user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken=jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    public void changeUsername (@NotBlank(message = "Username is required") String newUsername, @NotBlank(message = "Password is required") String password, User user) {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), password)
            );
            if(newUsername.equals(user.getUsername())){
                System.out.println("New username is the same as the old one");
                throw new RuntimeException("New username is the same as the old one");
            }
        } catch (AuthenticationException e) {
            System.out.println("Invalid credentials");
            throw new RuntimeException(e.getMessage());
        }
        if(userRepository.existsByUsername(newUsername)){
            System.out.println("Username already exists");
            throw new RuntimeException("Username already exists");
        }
        user.setUsername(newUsername);
        user.setCredentialsChangedAt(Instant.now());
        userRepository.save(user);
        System.out.println("Username changed successfully");

    }
    public void changePassword(@NotBlank(message = "New password is required") String newPassword, @NotBlank(message = "Old password is required") String oldPassword, @NotBlank(message = "Username is required") String username, User user) {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, oldPassword)
            );
            if(passwordEncoder.matches(newPassword, user.getPassword())){
                System.out.println("New password is the same as the old one");
                throw new RuntimeException("New password is the same as the old one");
            }
        } catch (AuthenticationException e) {
            System.out.println("Invalid credentials");
            throw new RuntimeException("Invalid credentials");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setCredentialsChangedAt(Instant.now());
        userRepository.save(user);
        System.out.println("Password changed successfully");
    }
    public void deleteAccount(@NotBlank(message = "Username is required") String username, @NotBlank(message = "Password is required") String password, User user) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (AuthenticationException e) {
            System.out.println("Invalid credentials");
            throw new RuntimeException("Invalid credentials");
        }
        List<WordBase> wordBases = user.getWordBases();
        if (wordBases != null && !wordBases.isEmpty()) {
            for (WordBase wordBase : wordBases) {
                wordBaseService.deleteWordBase(wordBase);
            }
        }
        userRepository.delete(user);
        System.out.println("Account deleted successfully");
    }
}
