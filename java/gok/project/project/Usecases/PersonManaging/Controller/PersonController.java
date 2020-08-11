package gok.project.project.Usecases.PersonManaging.Controller;

import gok.project.project.Usecases.PersonManaging.DTOPerson.PersonDTO;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import gok.project.project.Usecases.PersonManaging.ManagePerson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;
@RestController
@RequiredArgsConstructor
public class PersonController {
    private final ManagePerson managePerson;
    @GetMapping("/persons")
    public List<PersonDTO> persons(){
        return managePerson.list_of_persons();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/person")
    public PersonDTO person(@Valid @RequestBody PersonDTO person){

        managePerson.add_new_person(person);
        return person;
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/apply")
    public Boolean person(@Valid @RequestBody PersonDTO person,@RequestParam("event_id") Long event_id){
        return managePerson.apply_event(person,event_id);

    }
    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public PersonDTO getPerson(@RequestParam("token") String token){
         return managePerson.getPerson(token);
    }
}
