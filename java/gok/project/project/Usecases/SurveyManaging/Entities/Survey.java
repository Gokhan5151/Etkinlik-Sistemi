package gok.project.project.Usecases.SurveyManaging.Entities;

import gok.project.project.Usecases.BaseEntities.BaseClass;
import gok.project.project.Usecases.EventManaging.Entities.Event;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "idgen",sequenceName = "SURVEY_SEQUENCE")
public class Survey extends BaseClass {

    private String survey;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name="event_id")
    private Event event;
    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(
            name = "Surveys",
            joinColumns = @JoinColumn(name = "SURVEY_ID",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="PERSON_ID",referencedColumnName = "id")
    )
    private Set<Person> persons_survey;

    private String answers;

}
