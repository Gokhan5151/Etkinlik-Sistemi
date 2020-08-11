package gok.project.project.Usecases.EventManaging.Mapped;

import gok.project.project.Usecases.EventManaging.DTOEvent.EventDTO;
import gok.project.project.Usecases.EventManaging.Entities.Event;
import gok.project.project.Usecases.PersonManaging.DTOPerson.PersonDTO;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventMapped {
    Event maptoEntity(EventDTO p);
    EventDTO maptoDTO(Person p);
    List<EventDTO> maptoDTO(List<Event> p);
    List<Event> maptoEntity(List<EventDTO> p);
}
