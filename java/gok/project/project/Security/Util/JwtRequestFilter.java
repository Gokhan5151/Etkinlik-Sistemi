package gok.project.project.Security.Util;

import gok.project.project.Security.Manager.CustomDetailsManager;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.ParameterResolutionDelegate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    @Value("${security.jwt.secretKey}")
    private String secret_key;

    private final CustomDetailsManager customDetailsManager;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
         String author=request.getHeader("Authorization");
         if(author!=null&&author.startsWith("Bearer")){
             String token=author.substring(7);
             String username=JwtUtil.extract_username(token,secret_key);
             Person person=(Person)customDetailsManager.loadUserByUsername(username);
             var token_auth=new UsernamePasswordAuthenticationToken(person.getUsername(),null,person.getAuthorities());
             token_auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
             SecurityContextHolder.getContext().setAuthentication(token_auth);
         }
         filterChain.doFilter(request,response);
    }
}
