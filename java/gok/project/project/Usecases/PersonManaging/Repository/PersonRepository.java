package gok.project.project.Usecases.PersonManaging.Repository;
import gok.project.project.Usecases.PersonManaging.Entities.Person;

import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person,Long> {
            @Query("Select u from Person u where u.TC_kimlik=?1")
            Person findAllByTC(String TC);
            @Transactional
            @Query(value ="insert into merged_table(person_id,event_id) VALUES(?1,?2)" ,nativeQuery = true)
            void apply_event( Long person_id, Long event_id);
            Optional<Person> findByUsername(String username);
            boolean existsByUsername(String username);
}