package gok.project.project.Security.Util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import static java.util.stream.Collectors.toList;

public class JwtUtil {

    public static String generateToken(Authentication authentication,String secret_key,Integer expiration_day){
          return Jwts.builder()
                  .setSubject(authentication.getName())
                  .claim("authorities",getAuthorities(authentication))
                  .setIssuedAt(new Date()).setExpiration(Date.from(LocalDate.now().plusDays(expiration_day).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))
                  .signWith(Keys.hmacShaKeyFor(secret_key.getBytes()))
                  .compact();

    }
    private static List<String> getAuthorities(Authentication authentication){
        return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(toList());

    }
    public static String extract_username(String token,String secret_key){
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secret_key.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
