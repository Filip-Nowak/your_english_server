package org.example.server;

import org.example.server.entity.Relation;
import org.example.server.entity.User;
import org.example.server.entity.WordBase;
import org.example.server.model.ResponseModel;
import org.example.server.repository.RelationRepository;
import org.example.server.security.auth.AuthenticationService;
import org.example.server.security.auth.RegisterRequest;
import org.example.server.service.UserService;
import org.example.server.service.WordBaseService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;

import java.util.LinkedList;
import java.util.List;

@SpringBootApplication
public class ServerApplication {

    private final AuthenticationService authenticationService;

    public ServerApplication(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(UserService userService, WordBaseService wordBaseService, RelationRepository relationRepository) {
        return (args) -> {
            addExampleWordBase(userService, wordBaseService, relationRepository);
        };
    }
    private void addExampleWordBase(UserService userService, WordBaseService wordBaseService, RelationRepository relationRepository) {
        User user = User.builder()
                .username("your english")
                .password("").build();
        userService.saveUser(user);
        user = userService.getUserByUsername("your english");
        WordBase wordBase = WordBase.builder().user(user).name("Animals").relations(new LinkedList<>()).build();
        wordBaseService.saveWordBase(wordBase);
        wordBase = wordBaseService.getWordBaseByName("Animals", user.getId());
        List<String> words = List.of("cat", "dog", "fish", "bird", "elephant", "tiger", "lion", "bear", "monkey", "giraffe",
                "zebra", "kangaroo", "panda", "rabbit", "fox", "wolf", "deer", "squirrel", "hamster", "guinea pig");
        List<String> meanings = List.of("Kot", "Pies", "Ryba", "Ptak", "Słoń", "Tygrys", "Lew", "Niedźwiedź", "Małpa", "Żyrafa",
                "Zebra", "Kangur", "Panda", "Królik", "Lis", "Wilk", "Jeleń", "Wiewiórka", "Chomik", "Świnka morska");
        for (int i = 0; i < words.size(); i++) {
            Relation relation = getRelationObj(words.get(i), meanings.get(i), wordBase, i + 1);
            relationRepository.save(relation);
        }

        authenticationService.register(RegisterRequest.builder().username("chuj").password("asdfasdf").build());
        User user1 = userService.getUserByEmail("chuj");
        WordBase wordBase1 = wordBaseService.getWordBaseById(wordBase.getId());
        //clone
        wordBase1 = WordBase.builder()
                .name(wordBase1.getName())
                .user(user1)
                .relations(new LinkedList<>())
                .version(wordBase1.getVersion() + 1)
                .build();
        wordBase1.setUser(user1);
        wordBaseService.saveWordBase(wordBase1);
        wordBase1 = wordBaseService.getWordBaseByName("Animals", user1.getId());
        for (int i = 0; i < words.size(); i++) {
            Relation relation = getRelationObj(words.get(i), meanings.get(i), wordBase1, i + 1);
            relationRepository.save(relation);
        }


    }
    private Relation getRelationObj(String word, String meaning, WordBase wordBase, int number) {
        return Relation.builder()
                .word(word)
                .meaning(meaning)
                .wordBase(wordBase)
                .number(number)
                .build();
    }
}
