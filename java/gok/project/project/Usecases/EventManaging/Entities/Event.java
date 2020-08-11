package gok.project.project.Usecases.EventManaging.Entities;

import java.time.LocalDate;

import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import gok.project.project.Usecases.BaseEntities.BaseClass;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import gok.project.project.Usecases.SurveyManaging.Entities.Survey;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.mapstruct.Mapper;



@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "events")
@Mapper(componentModel = "PersonDTO")
@SequenceGenerator(name = "idgen",sequenceName = "EVENT_SEQUENCE")
public class Event extends BaseClass {

    public static int capacity=10;
    @Column(name="user_count")
    private int user_count=0;
    @NotBlank
    @Column(name="event_name",nullable = false)
    private String event_name;
    @Column(name="event_start_date")
    private LocalDate event_start_date;
    @Column(name="event_last_date")
    private LocalDate event_last_date;
    @ManyToMany(targetEntity = Person.class,cascade = {CascadeType.PERSIST, CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH},fetch = FetchType.LAZY)
    @JoinTable(
            name = "MergedTable",
            joinColumns=@JoinColumn(name = "event_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "person_id",referencedColumnName = "id"
            )
    )
    private Set<Person> persons;
    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(
            name = "application_dates",
            joinColumns = @JoinColumn(name = "EVENT_ID"),
            inverseJoinColumns = @JoinColumn(name = "APPLICATION_DATE")
    )
    private Set<ApplyDate> application_dates;
    @OneToOne(mappedBy = "event",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Survey survey;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="person_id")
    private Person trainer;

}