package gok.project.project.Security.Login;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;
    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public LoginResponse login(@RequestBody LoginRequest request){
           return loginService.getRepsonse(request);
    }

    @GetMapping("/control")
    @CrossOrigin(origins = "*")
    public Integer control(){
        return 1;
    }
}
