package com.SanJuanPunchMan.SystemInteg.configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.SanJuanPunchMan.SystemInteg.filter.JwtAuthenticationFilter;
import com.SanJuanPunchMan.SystemInteg.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		SecurityFilterChain sc = http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req->req.requestMatchers("/jwt/login**","/jwt/register**",
                        		"/register/generateOtp/**","/register/verifyOtp/**",
                        		"/jwt/admin-register**", "/jwt/admin-login**",
                        		"/jwt/employee-register**", "/jwt/employee-login**",
//                        		TO Delete
                        		"registration/create-registration**",
                        		"/photo/gdrive-upload**", "/photo/gdrive-view**" 
                        		)
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                ).userDetailsService(userService)
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(
                        e->e.accessDeniedHandler(
                                        (request, response, accessDeniedException)->response.setStatus(403)
                                )
                                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .build();
        
//		System.out.print(sc);
        return sc;
    }
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    } 
	
}
