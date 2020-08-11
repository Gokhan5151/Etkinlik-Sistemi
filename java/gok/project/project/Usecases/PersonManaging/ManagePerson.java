package gok.project.project.Usecases.PersonManaging;

import gok.project.project.Security.Util.JwtUtil;
import gok.project.project.Usecases.EventManaging.Entities.ApplyDate;
import gok.project.project.Usecases.EventManaging.Entities.Event;
import gok.project.project.Usecases.EventManaging.EventManage;
import gok.project.project.Usecases.EventManaging.Repository.EventRepository;
import gok.project.project.Usecases.PersonManaging.DTOPerson.PersonDTO;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import gok.project.project.Usecases.PersonManaging.Mapped.PersonMapped;
import gok.project.project.Usecases.PersonManaging.Repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;



@Service
@RequiredArgsConstructor
public class ManagePerson {
    private final PersonRepository personRepository;
    private final EventRepository eventRepository;
    private final EventManage eventManage;
    private final PersonMapped mapped;

    @Value("${security.jwt.secretKey}")
    private String secret_key;

    public List<PersonDTO> list_of_persons(){
        List<Person> persons= personRepository.findAll();
        List<PersonDTO> mapped_persons=mapped.maptoDTO(persons);

        return mapped_persons;
    }

    public void add_new_person(PersonDTO person) {
        Person p=mapped.maptoEntity(person);
        personRepository.save(p);

    }

    public boolean apply_event(PersonDTO person, Long event_id){
        Event e=eventManage.find_event(event_id);
        if(e.getUser_count()!=Event.capacity){


            try {
                if(personRepository.findAllByTC(person.getTC_kimlik()).getTC_kimlik()==null)
                    return false;
                if(e.getPersons().contains(personRepository.findAllByTC(person.getTC_kimlik())))
                    return false;
                e.getPersons().add(personRepository.findAllByTC(person.getTC_kimlik()));
                e.getApplication_dates().add(new ApplyDate(null, LocalDate.now()));
                e.setUser_count(e.getUser_count()+1);
                eventRepository.flush();
                return true;
            }catch (NullPointerException exception){
                return false;
            }catch (Exception exception){
                return false;
            }
        }else{
            return false;
        }


    }

    public PersonDTO getPerson(String token) {
        try{
            String username=JwtUtil.extract_username(token,secret_key);
            Person p=personRepository.findByUsername(username).get();
            PersonDTO personDTO=mapped.maptoDTO(p);
            personDTO.setAuthorities(p.getAuthorities());

            personDTO.setEvents(p.getEvents());

            return personDTO;
        }catch (Exception e) {
            return null;
        }


    }
}
