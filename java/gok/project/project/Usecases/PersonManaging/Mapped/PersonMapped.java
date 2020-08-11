package gok.project.project.Usecases.PersonManaging.Mapped;

import gok.project.project.Usecases.PersonManaging.DTOPerson.PersonDTO;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PersonMapped {
    Person maptoEntity(PersonDTO p);
    PersonDTO maptoDTO(Person p);
    List<PersonDTO> maptoDTO(List<Person> p);
    List<Person> maptoEntity(List<PersonDTO> p);
}
