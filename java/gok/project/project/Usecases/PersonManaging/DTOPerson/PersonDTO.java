package gok.project.project.Usecases.PersonManaging.DTOPerson;

import gok.project.project.Security.Entities.Authority;
import gok.project.project.Usecases.EventManaging.Entities.Event;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.constraints.*;
import java.util.Set;

@Getter
@Setter
public class PersonDTO {
    private String name;
    private String surname;
    private Integer age;
    private String country;
    @Email
    private String e_mail;
    private String city;
    
    @NotBlank(message = "Boş geçememelisin!")
    @Size(min=11,max = 11,message = "It must be eleven character length")
    private String TC_kimlik;
    private Set<Authority> authorities;
    private Set<Event> events;
    private Event trainer_event;
}
