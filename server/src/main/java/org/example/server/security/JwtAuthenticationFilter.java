package org.example.server.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.service.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserService userService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");
        final String jwt;
        System.out.println("Authorization header: "+authorizationHeader);
        if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            System.out.println("filtering");
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        Instant createdAt = jwtService.extractCreatedAt(jwt);

        System.out.println("User email: "+username);
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            User user = userService.getUserByUsername(username);
            if(user == null){
                System.out.println("User not found");
                filterChain.doFilter(request, response);
                return;
            }
            if(user.getCredentialsChangedAt().isAfter(createdAt)){
                System.out.println("Credentials changed, token is invalid");
                filterChain.doFilter(request, response);
                return;
            }
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if(jwtService.isTokenValid(jwt, userDetails)){
                UsernamePasswordAuthenticationToken token= new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                token.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(token);
            }
        }
        filterChain.doFilter(request, response);
    }
}
