package br.com.sistema.Config.Security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST,"/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/emails/send-email").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/api/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,"/api/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/alunos/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/aulas/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/coordenadorias/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/coordenadoresTurno/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/cursos/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/disciplinas/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/equipamentos/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/eventos/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/historico-aulas/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/horarios/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/locais/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/periodos/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/professores/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/turmas/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
