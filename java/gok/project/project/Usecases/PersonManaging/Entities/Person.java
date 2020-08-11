package gok.project.project.Usecases.PersonManaging.Entities;


import java.util.Collection;
import java.util.Set;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import gok.project.project.Security.Entities.Authority;
import gok.project.project.Usecases.BaseEntities.BaseClass;
import gok.project.project.Usecases.EventManaging.Entities.Event;
import gok.project.project.Usecases.SurveyManaging.Entities.Survey;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Entity
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "idgen",sequenceName = "PERSON_SEQUENCE")
public class Person extends BaseClass implements UserDetails, CredentialsContainer {

    @Column(name = "USERNAME",nullable = false,unique = true)
    private String username;
    @Column(name = "PASSWORD",nullable = false)
    private String password;
    @Column(name = "NAME",nullable = false)
    private String name;
    @Column(name = "SURNAME",nullable = false)
    private String surname;
    @Column(name="e_mail")
    private String e_mail;
    @Column(name = "AGE")
    private Integer age;
    @Column(name = "COUNTRY")
    private String country;
    @Column(name = "CITY")
    private String city;
    @Column(name = "TC_KIMLIK",nullable = false,unique = true)
    private String TC_kimlik;
    @JsonIgnore
    @ManyToMany(targetEntity = Event.class,mappedBy = "persons",cascade = {CascadeType.PERSIST, CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH},fetch = FetchType.LAZY)
    private Set<Event> events;
    @ManyToMany(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(
            name = "PERSON_AUTHORITIES",
            joinColumns = @JoinColumn(name = "PERSON_ID"),
            inverseJoinColumns = @JoinColumn(name = "AUTHORITY_ID")
    )
    private Set<Authority> authorities;
    @ManyToMany(targetEntity =Survey.class,cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "persons_survey")
    private Set<Survey> surveys;
    @JsonIgnore
    @OneToOne(mappedBy = "trainer",orphanRemoval = true,cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH},fetch = FetchType.EAGER)
    private Event trainer_event;
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public void eraseCredentials() {
        password=null;
    }
}