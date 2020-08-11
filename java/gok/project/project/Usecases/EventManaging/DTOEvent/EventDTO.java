package gok.project.project.Usecases.EventManaging.DTOEvent;

import gok.project.project.Usecases.EventManaging.Entities.ApplyDate;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import gok.project.project.Usecases.SurveyManaging.Entities.Survey;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
@Getter
@Setter
public class EventDTO {
    @NotBlank
    private int user_count=0;
    private String event_name;
    private LocalDate event_start_date;
    private LocalDate event_last_date;
    private Set<Person> persons;
    private Set<ApplyDate> application_dates;
    private Survey survey;
    
}
