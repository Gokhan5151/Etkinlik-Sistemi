package gok.project.project.Usecases.EventManaging.Repository;

import gok.project.project.Usecases.EventManaging.Entities.Event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long>{
     @Query("select u from Event u order by creation_date desc")
     List<Event> findAllByDateDesc();

}