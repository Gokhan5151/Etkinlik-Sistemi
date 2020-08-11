package gok.project.project.Usecases.EventManaging.Controller;

import gok.project.project.Usecases.EventManaging.Entities.Event;
import gok.project.project.Usecases.EventManaging.EventManage;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class EventController {

     private final EventManage eventManage;

    @CrossOrigin(origins = "*")
    @PostMapping("/newevent")
    public Boolean newevent(@RequestBody Event event){
        return eventManage.new_event(event);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/events")
    public List<Event> events(){

        return eventManage.all_events();
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/update")
    public Boolean update(@RequestBody Event event){
        return eventManage.update_event(event);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Long id){
      return eventManage.delete_event(id);
    }
}
