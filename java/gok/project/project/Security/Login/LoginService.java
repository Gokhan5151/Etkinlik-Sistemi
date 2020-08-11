package gok.project.project.Security.Login;

import gok.project.project.Security.Util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final DaoAuthenticationProvider daoAuthenticationProvider;
    @Value("${security.jwt.secretKey}")
    private String secret_key;

    public LoginResponse getRepsonse(LoginRequest loginRequest){
        Authentication authentication=new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword());
        try{
            Authentication auth=daoAuthenticationProvider.authenticate(authentication);
            String token= JwtUtil.generateToken(auth,secret_key,1);
            LoginResponse loginResponse=new LoginResponse(token);

            return new LoginResponse(token);
        }catch (AuthenticationException e){
            e.printStackTrace();
        }
        return null;
    }
}
