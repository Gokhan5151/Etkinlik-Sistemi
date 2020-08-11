package gok.project.project.Security.Login;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
public class LoginRequest {

    @NotNull
    private final String username;
    @NotNull
    private final String password;

}
