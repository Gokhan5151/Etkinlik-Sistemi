package gok.project.project.Security.Login;

import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginResponse {
    private final String token;

    public LoginResponse(final String token) {
        this.token = token;
    }
}
