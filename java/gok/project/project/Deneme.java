package gok.project.project;

import gok.project.project.Security.Entities.Authority;
import gok.project.project.Security.Manager.CustomDetailsManager;
import gok.project.project.Security.Repositories.AuthorityRepository;
import gok.project.project.Usecases.EventManaging.Entities.Event;
import gok.project.project.Usecases.EventManaging.Repository.EventRepository;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
@RequiredArgsConstructor
@Component

public class Deneme {
    private final CustomDetailsManager customDetailsManager;
    private final AuthorityRepository authorityRepository;
    private final EventRepository eventRepository;
    @Transactional
    public void load(){


        List<Authority> authorities= authorityRepository.saveAll(Set.of(new Authority(null,"WRITE"),new Authority(null,"READ"),new Authority(null,"TRAINER")));
        Person person=new Person("admin","12345","Gökhan","Ergen","ergen5171@gmail.com",18,"Türkiye","Niğde","25004429220", Set.of(),Set.copyOf(authorities),null,null);
        Person person1=new Person("user","12345","Mehmet","berk","mehmet5171@gmail.com",25,"Türkiye","Kayseri","00000000000", Set.of(),Set.of(new Authority(null,"READ")),null,null);
        Person person3=new Person("user1","12345","Selçuk","Tan","selcuk171@gmail.com",28,"Türkiye","Kayseri","00000000002", Set.of(),Set.of(new Authority(null,"READ")),null,null);


        Person person2=new Person("trainer","12345","Erdem","can","erdem5171@gmail.com",35,"Türkiye","Ankara","00000000001", Set.of(),Set.of(new Authority(null,"READ"),new Authority(null,"TRAINER")),null,null);

        customDetailsManager.createUser(person);
        customDetailsManager.createUser(person1);
        customDetailsManager.createUser(person2);
        customDetailsManager.createUser(person3);
        Event event=new Event(0,"Toplantı", LocalDate.of(2020,8,4), LocalDate.of(2020,8,8),null,Set.of(),null,person2);
        eventRepository.save(event);


    }
}
