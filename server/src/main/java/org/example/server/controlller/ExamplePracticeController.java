package org.example.server.controlller;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.WordBase;
import org.example.server.model.*;
import org.example.server.service.PracticeService;
import org.example.server.service.WordBaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://192.168.1.26:3000"}, allowCredentials = "true")

@RequiredArgsConstructor
@RequestMapping("/api/example-practice")
public class ExamplePracticeController {
    private final PracticeService practiceService;
    private final WordBaseService wordBaseService;
    @GetMapping("/flashcards")
    public ResponseEntity<ResponseModel> getFlashcards() {
        WordBase wordBase;
        try{
            wordBase = wordBaseService.getExampleWordBase();
        }catch (Exception e){
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("Error: " + e.getMessage())
                    .build());
        }

        List<RelationModel> relationModels = practiceService.getFlashcards(wordBase);
        if (relationModels.isEmpty()) {
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("No more flashcards")
                    .build());
        }
        FlashcardsModel flashcardsModel = FlashcardsModel.builder()
                .words(relationModels)
                .max(20)
                .build();
        return ResponseEntity.ok(ResponseModel.builder()
                .error(false)
                .data(flashcardsModel)
                .build());
    }

    @GetMapping("/choice")
    public ResponseEntity<ResponseModel> getChoice() {
        WordBase wordBase;
        try {
            wordBase = wordBaseService.getExampleWordBase();
        } catch (Exception e) {
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("Error: " + e.getMessage())
                    .build());
        }
        List<ChoiceModel> relationModels = practiceService.getChoice(wordBase);
        if (relationModels.isEmpty()) {
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("No more choices")
                    .build());
        }
        return ResponseEntity.ok(ResponseModel.builder()
                .error(false)
                .data(relationModels)
                .build());
    }
    @GetMapping("/connect")
    public ResponseEntity<ResponseModel> getConnect() {
        WordBase wordBase;
        try {
            wordBase = wordBaseService.getExampleWordBase();
        } catch (Exception e) {
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("Error: " + e.getMessage())
                    .build());
        }
        List<List<RelationInfoModel>> relationModels = practiceService.getConnect(wordBase);
        if (relationModels.isEmpty()) {
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("No more connections")
                    .build());
        }
        return ResponseEntity.ok(ResponseModel.builder()
                .error(false)
                .data(relationModels)
                .build());
    }
    @GetMapping("insert")
    public ResponseEntity<ResponseModel> getInsert() {
        WordBase wordBase;
        try {
            wordBase = wordBaseService.getExampleWordBase();
        } catch (Exception e) {
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("Error: " + e.getMessage())
                    .build());
        }
        List<RelationInfoModel> relationModels = practiceService.getInsert(wordBase);
        if (relationModels.isEmpty()) {
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message("No more insertions")
                    .build());
        }
        return ResponseEntity.ok(ResponseModel.builder()
                .error(false)
                .data(relationModels)
                .build());
    }
}
