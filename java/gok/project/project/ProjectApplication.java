package gok.project.project;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;



@SpringBootApplication
@RequiredArgsConstructor
public class ProjectApplication {
    private final Deneme deneme;

	public static void main(String[] args) throws IOException {
		var context = SpringApplication.run(ProjectApplication.class, args);

	}
	@PostConstruct
	private void load(){
     deneme.load();

	}

}
