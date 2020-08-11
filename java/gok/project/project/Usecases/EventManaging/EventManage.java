package gok.project.project.Usecases.EventManaging;

import gok.project.project.Usecases.EventManaging.Entities.Event;
import gok.project.project.Usecases.EventManaging.Mapped.EventMapped;
import gok.project.project.Usecases.EventManaging.Repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class EventManage {
    private final EventRepository eventRepository;
    private final EventMapped eventMapped;

    public Boolean new_event(Event event){
        try{


            eventRepository.save(event);
        }catch (IllegalArgumentException e){
            return false;
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public List<Event> all_events(){
        List<Event> events=eventRepository.findAllByDateDesc();
        events.forEach(e->{
            e.getPersons().forEach(person->person.setEvents(null));


        });
        return events;

    }

    public Boolean update_event(Event event) {
        try{
            eventRepository.save(event);
        }catch (IllegalArgumentException e){
            e.printStackTrace();
            return false;
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public Boolean delete_event(Long id){
        try{
            eventRepository.deleteById(id);
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public Event find_event(Long id){

        try{
            Event event=eventRepository.getOne(id);
            return event;
        }catch (Exception e){
            return null;
        }
    }
}
