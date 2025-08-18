package org.example.server.controlller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.entity.WordBase;
import org.example.server.model.*;
import org.example.server.security.UserSession;
import org.example.server.service.PracticeService;
import org.example.server.service.UserService;
import org.example.server.service.WordBaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://192.168.1.26:3000"}, allowCredentials = "true")

@RequiredArgsConstructor
@RequestMapping("/api/practice")
public class PracticeController {
    private final PracticeService practiceService;
    private final UserService userService;
    private final WordBaseService wordBaseService;
    private final UserSession userSession;

    @GetMapping("/flashcards")
    public ResponseEntity<ResponseModel> getFlashcards(@RequestHeader(name = "Authorization") String header, @RequestParam() int page, @RequestParam List<String> w, @RequestParam(required = false) boolean newSet, HttpServletRequest request) {
        try {
            User user = userService.getUserByHeader(header);
            if (page < 0) {
                throw new RuntimeException("Page number must be greater than or equal to 0");
            }
            List<WordBase> wordBaseList = new LinkedList<>();
            for (String s : w) {
                wordBaseList.add(wordBaseService.getWordBaseByName(s, user.getId()));
            }
            List<RelationModel> relationModels = practiceService.getFlashcards(userSession, wordBaseList, page, newSet);
            if (relationModels.isEmpty()) {
                throw new RuntimeException("No more flashcards");
            }
            FlashcardsModel flashcardsModel = FlashcardsModel.builder()
                    .words(relationModels)
                    .max(userSession.getData().getRelationIds().size())
                    .build();
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(false)
                    .data(flashcardsModel)
                    .build());
        } catch (RuntimeException e) {
            System.out.println(e);
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/choice")
    public ResponseEntity<ResponseModel> getChoice(@RequestHeader(name = "Authorization") String header, @RequestParam List<String> w) {
//        try {
            User user = userService.getUserByHeader(header);
            List<WordBase> wordBaseList = new LinkedList<>();
            for (String s : w) {
                wordBaseList.add(wordBaseService.getWordBaseByName(s, user.getId()));
            }
            List<ChoiceModel> relationModels = practiceService.getChoice(wordBaseList);
            if (relationModels.isEmpty()) {
                throw new RuntimeException("No more choices");
            }
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(false)
                    .data(relationModels)
                    .build());

//        } catch (RuntimeException e) {
//            System.out.println(e);
//            return ResponseEntity.ok(ResponseModel.builder()
//                    .error(true)
//                    .message("Error: " + e.getMessage())
//                    .build());
//        }
    }

    @GetMapping("/connect")
    public ResponseEntity<ResponseModel> getConnect(@RequestHeader(name = "Authorization") String header, @RequestParam List<String> w) {
        try {
            User user = userService.getUserByHeader(header);
            List<WordBase> wordBaseList = new LinkedList<>();
            for (String s : w) {
                wordBaseList.add(wordBaseService.getWordBaseByName(s, user.getId()));
            }
            List<List<RelationInfoModel>> relationModels = practiceService.getConnect(wordBaseList);
            if (relationModels.isEmpty()) {
                throw new RuntimeException("No more connections");
            }
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(false)
                    .data(relationModels)
                    .build());
        } catch (RuntimeException e) {
            System.out.println(e);
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/insert")
    public ResponseEntity<ResponseModel> getInsert(@RequestHeader(name = "Authorization") String header, @RequestParam List<String> w) {
        try {
            User user = userService.getUserByHeader(header);
            List<WordBase> wordBaseList = new LinkedList<>();
            for (String s : w) {
                wordBaseList.add(wordBaseService.getWordBaseByName(s, user.getId()));
            }
            List<RelationInfoModel> relationModels = practiceService.getInsert(wordBaseList);
            if (relationModels.isEmpty()) {
                throw new RuntimeException("No more insertions");
            }
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(false)
                    .data(relationModels)
                    .build());
        } catch (RuntimeException e) {
            System.out.println(e);
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("Error: " + e.getMessage())
                    .build());
        }
    }
    @GetMapping("/random")
    public ResponseEntity<ResponseModel> getRandom(@RequestHeader(name = "Authorization") String header, @RequestParam List<String> w) {
        try {
            User user = userService.getUserByHeader(header);
            List<WordBase> wordBaseList = new LinkedList<>();
            for (String s : w) {
                wordBaseList.add(wordBaseService.getWordBaseByName(s, user.getId()));
            }
            Map<String,Object> model= practiceService.getRandom(wordBaseList);
            if (model.isEmpty()) {
                throw new RuntimeException("No more random");
            }
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(false)
                    .data(model)
                    .build());
        } catch (RuntimeException e) {
            System.out.println(e);
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("Error: " + e.getMessage())
                    .build());
        }
    }
}
