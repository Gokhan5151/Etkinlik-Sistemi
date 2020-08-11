package gok.project.project.Security.Manager;

import gok.project.project.Security.Configs.PasswordEncoderConfig;
import gok.project.project.Usecases.PersonManaging.Entities.Person;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;
import gok.project.project.Usecases.PersonManaging.Repository.PersonRepository;

@Service
@RequiredArgsConstructor
public class CustomDetailsManager implements UserDetailsManager {
    private final PersonRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void createUser(final UserDetails user) {
          Person person=(Person)user;
          person.setPassword(passwordEncoder.encode(person.getPassword()));
          userRepository.save(person);
    }

    @Override
    public void updateUser(UserDetails user) {

        Person oldPerson=(Person) loadUserByUsername(user.getUsername());
        Person newPerson=(Person)user;
        newPerson.setId(oldPerson.getId());
        userRepository.save(newPerson);

    }

    @Override
    public void deleteUser(String username) {
           Person person=(Person)loadUserByUsername(username);
           userRepository.delete(person);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {

    }

    @Override
    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).get();
    }
}
