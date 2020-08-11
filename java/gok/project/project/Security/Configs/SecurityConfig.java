package gok.project.project.Security.Configs;

import gok.project.project.Security.Manager.CustomDetailsManager;
import gok.project.project.Security.Util.JwtRequestFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final CustomDetailsManager customDetailsManager;
    private final JwtRequestFilter jwtRequestFilter;

    @Override
    public void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.authenticationProvider(getAuthenticationProvider());
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
         http.cors().and().authorizeRequests()
                 .antMatchers("/login").permitAll()
                 .antMatchers("/events").hasAnyAuthority("WRITE","READ")
                 .antMatchers("/newevent").hasAnyAuthority("WRITE")
                 .antMatchers("/update").hasAnyAuthority("WRITE")
                 .antMatchers("/delete").hasAnyAuthority("WRITE")
                 .antMatchers("/control").hasAnyAuthority("WRITE","READ")
                 .antMatchers("/persons").hasAnyAuthority("WRITE")
                 .antMatchers("/person").hasAnyAuthority("WRITE","READ")
                 .antMatchers("/apply").hasAnyAuthority("WRITE","READ")
                 .antMatchers("/get").hasAnyAuthority("WRITE","READ","TRAINER")
                 .anyRequest().authenticated()
                 .and()
                 .sessionManagement()
                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                 .and()
                 .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                 .formLogin().disable()
                 .logout().disable()
                 .httpBasic().disable()
                 .csrf().disable();
    }
    @Bean
    public DaoAuthenticationProvider getAuthenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider=new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(customDetailsManager);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        return daoAuthenticationProvider;
    }

}
