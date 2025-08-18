package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.Relation;
import org.example.server.entity.WordBase;
import org.example.server.model.ChoiceModel;
import org.example.server.model.RelationInfoModel;
import org.example.server.model.RelationModel;
import org.example.server.security.SessionData;
import org.example.server.security.UserSession;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PracticeService {
    private final WordBaseService wordBaseService;

    public List<RelationModel> getFlashcards(UserSession userSession, List<WordBase> wordBaseList, int page, boolean newSet) throws RuntimeException {
        SessionData sessionData = getSessionData(userSession.getData(), userSession, wordBaseList, newSet);
        int startIndex = page * 20;
        if (startIndex >= sessionData.getRelationIds().size()) {
            return new LinkedList<>();
        }
        List<RelationModel> relationModels = new LinkedList<>();
        for (int i = startIndex; i < startIndex + 20; i++) {
            if (i >= sessionData.getRelationIds().size()) {
                break;
            }
            Relation relation = wordBaseService.getRelationById(sessionData.getRelationIds().get(i));
            relationModels.add(RelationModel.builder()
                    .word(relation.getWord())
                    .meaning(relation.getMeaning())
                    .build());
        }
        return relationModels;
    }

    private boolean areTheSameSet(List<Long> wordBaseIds, List<WordBase> wordBaseList) {
        if (wordBaseIds.size() != wordBaseList.size()) {
            return false;
        }
        wordBaseList = sortAlphabetically(wordBaseList);
        for (int i = 0; i < wordBaseIds.size(); i++) {
            if (!Objects.equals(wordBaseIds.get(i), wordBaseList.get(i).getId())) {
                return false;
            }
        }
        return true;
    }

    private boolean areVersionsDifferent(List<Long> versions, List<WordBase> wordBaseList) {
        for (int i = 0; i < versions.size(); i++) {
            if (versions.get(i) != wordBaseList.get(i).getVersion()) {
                return true;
            }
        }
        return false;
    }

    private SessionData getSessionData(SessionData sessionData, UserSession userSession, List<WordBase> wordBaseList, boolean newSet) {
        if (sessionData == null || newSet || !areTheSameSet(sessionData.getWordBaseIds(), wordBaseList)) {
            sessionData = generateSessionData(wordBaseList);
            userSession.setData(sessionData);
        } else {
            if (areVersionsDifferent(sessionData.getVersions(), wordBaseList)) {
                throw new RuntimeException("Word bases have been modified");
            }
        }
        return sessionData;
    }

    private SessionData generateSessionData(List<WordBase> wordBaseList) {
        wordBaseList = sortAlphabetically(wordBaseList);
        List<Long> wordBaseIds = wordBaseList.stream().map(WordBase::getId).toList();
        List<Long> relationIds = new LinkedList<>();
        for (WordBase wordBase : wordBaseList) {
            relationIds.addAll(wordBase.getRelations().stream().map(Relation::getId).toList());
        }
        relationIds = scramble(relationIds);
        List<Long> versions = wordBaseList.stream().map(WordBase::getVersion).toList();
        return SessionData.builder()
                .wordBaseIds(wordBaseIds)
                .relationIds(relationIds)
                .versions(versions)
                .build();
    }

    private List<Long> scramble(List<Long> relationIds) {
        List<Long> scrambled = new LinkedList<>();
        while (!relationIds.isEmpty()) {
            int index = (int) (Math.random() * relationIds.size());
            scrambled.add(relationIds.get(index));
            relationIds.remove(index);
        }
        return scrambled;
    }

    private List<WordBase> sortAlphabetically(List<WordBase> wordBaseList) {
        return wordBaseList.stream().sorted(Comparator.comparing(WordBase::getName)).collect(Collectors.toList());
    }


    public List<ChoiceModel> getChoice(List<WordBase> wordBaseList) {
        List<Relation> relations = getRelations(wordBaseList);
        List<ChoiceModel> choiceModels = new LinkedList<>();
        for (Relation relation : relations) {
            List<Relation> possibleRelations = new LinkedList<>(relation.getWordBase().getRelations());
            System.out.println("chuj");
            System.out.println(possibleRelations.size());
            possibleRelations.remove(relation);
            boolean language = Math.random() < 0.5;
            ChoiceModel choiceModel = new ChoiceModel();
            choiceModel.setWordBaseName(relation.getWordBase().getName());
            choiceModel.setWord(language ? relation.getWord() : relation.getMeaning());
            List<String> meanings = new LinkedList<>();
            meanings.add(language ? relation.getMeaning() : relation.getWord());
            for (int i = 0; i < 3; i++) {
                Relation answer = possibleRelations.get((int) (Math.random() * possibleRelations.size()));
                meanings.add(language ? answer.getMeaning() : answer.getWord());
                possibleRelations.remove(answer);
            }
            choiceModel.setMeanings(meanings);
            choiceModels.add(choiceModel);
        }
        return choiceModels;
    }

    private List<Relation> getRelations(List<WordBase> wordBaseList) {
        List<Relation> relations = new LinkedList<>();
        for (WordBase wordBase : wordBaseList) {
            relations.addAll(wordBase.getRelations());
        }
        List<Relation> output = new LinkedList<>();
        for (int i = 0; i < 20; i++) {
            int index = (int) (Math.random() * relations.size());
            output.add(relations.get(index));
            relations.remove(index);
        }
        return output;
    }

    public List<List<RelationInfoModel>> getConnect(List<WordBase> wordBaseList) {
        List<Relation> relations = getRelations(wordBaseList);
        List<List<RelationInfoModel>> connectList = new LinkedList<>();
        for (int i = 0; i < 4; i++) {
            List<RelationInfoModel> relationModels = new LinkedList<>();
            for (int j = 0; j < 5; j++) {
                int index = (int) (Math.random() * relations.size());
                Relation relation = relations.get(index);
                relationModels.add(RelationInfoModel.builder()
                        .word(relation.getWord())
                        .meaning(relation.getMeaning())
                        .wordBaseName(relation.getWordBase().getName())
                        .build());
                relations.remove(index);
            }
            connectList.add(relationModels);
        }
        return connectList;
    }

    public List<RelationInfoModel> getInsert(List<WordBase> wordBaseList) {
        List<Relation> relations = getRelations(wordBaseList);
        List<RelationInfoModel> relationModels = new LinkedList<>();
        for (int i = 0; i < 20; i++) {
            int index = (int) (Math.random() * relations.size());
            Relation relation = relations.get(index);
            relationModels.add(RelationInfoModel.builder()
                    .word(relation.getWord())
                    .meaning(relation.getMeaning())
                    .wordBaseName(relation.getWordBase().getName())
                    .build());
            relations.remove(index);
        }
        return relationModels;
    }

    public Map<String, Object> getRandom(List<WordBase> wordBaseList) {
        List<Relation> relations = getRelations(wordBaseList);
        int mode = (int) (Math.random() * 3);
        if (mode == 0) {
            return Map.of("mode", "choice", "quest", getSingleChoice(relations));
        } else if (mode == 1) {
            return Map.of("mode", "insert", "quest", getSingleInsert(relations));
        } else {
            return Map.of("mode", "connect", "quest", getSingleConnect(relations));
        }
    }

    private List<RelationInfoModel> getSingleConnect(List<Relation> relations) {
        List<RelationInfoModel> relationModels = new LinkedList<>();
        for (int i = 0; i < 5; i++) {
            int index = (int) (Math.random() * relations.size());
            Relation relation = relations.get(index);
            relationModels.add(RelationInfoModel.builder()
                    .word(relation.getWord())
                    .meaning(relation.getMeaning())
                    .wordBaseName(relation.getWordBase().getName())
                    .build());
            relations.remove(index);
        }
        return relationModels;
    }

    private RelationInfoModel getSingleInsert(List<Relation> relations) {
        Relation relation = relations.get((int) (Math.random() * relations.size()));
        RelationInfoModel relationModel = RelationInfoModel.builder()
                .word(relation.getWord())
                .meaning(relation.getMeaning())
                .wordBaseName(relation.getWordBase().getName())
                .build();
        return relationModel;
    }

    private ChoiceModel getSingleChoice(List<Relation> relations) {
        Relation relation = relations.get((int) (Math.random() * relations.size()));
        List<Relation> possibleRelations = new LinkedList<>(relation.getWordBase().getRelations());
        possibleRelations.remove(relation);
        boolean language = Math.random() < 0.5;
        ChoiceModel choiceModel = new ChoiceModel();
        choiceModel.setWordBaseName(relation.getWordBase().getName());
        choiceModel.setWord(language ? relation.getWord() : relation.getMeaning());
        List<String> meanings = new LinkedList<>();
        meanings.add(language ? relation.getMeaning() : relation.getWord());
        for (int i = 0; i < 3; i++) {
            Relation answer = possibleRelations.get((int) (Math.random() * possibleRelations.size()));
            meanings.add(language ? answer.getMeaning() : answer.getWord());
            possibleRelations.remove(answer);
        }
        choiceModel.setMeanings(meanings);
        return choiceModel;
    }

    public List<RelationModel> getFlashcards(WordBase wordBase) {
        List<Relation> relations = wordBase.getRelations();
        //scramble relations
        List<RelationModel> relationModels = new LinkedList<>();
        for (Relation relation : relations) {
            relationModels.add(RelationModel.builder()
                    .word(relation.getWord())
                    .meaning(relation.getMeaning())
                    .build());
        }
        Collections.shuffle(relationModels);
        return relationModels;
    }

    public List<ChoiceModel> getChoice(WordBase wordBase) {
        List<Relation> relations = wordBase.getRelations();
        //scramble relations
        Collections.shuffle(relations);
        List<ChoiceModel> choiceModels = new LinkedList<>();
        for (Relation relation : relations) {
            List<Relation> possibleRelations = new LinkedList<>(relation.getWordBase().getRelations());
            possibleRelations.remove(relation);
            boolean language = Math.random() < 0.5;
            ChoiceModel choiceModel = new ChoiceModel();
            choiceModel.setWordBaseName(relation.getWordBase().getName());
            choiceModel.setWord(language ? relation.getWord() : relation.getMeaning());
            List<String> meanings = new LinkedList<>();
            meanings.add(language ? relation.getMeaning() : relation.getWord());
            for (int i = 0; i < 3; i++) {
                Relation answer = possibleRelations.get((int) (Math.random() * possibleRelations.size()));
                meanings.add(language ? answer.getMeaning() : answer.getWord());
                possibleRelations.remove(answer);
            }
            choiceModel.setMeanings(meanings);
            choiceModels.add(choiceModel);
        }
        //scramble choiceModels
        Collections.shuffle(choiceModels);
        return choiceModels;
    }
    public List<List<RelationInfoModel>> getConnect(WordBase wordBase) {
        List<Relation> relations = wordBase.getRelations();
        List<List<RelationInfoModel>> connectList = new LinkedList<>();
        for (int i = 0; i < 4; i++) {
            List<RelationInfoModel> relationModels = new LinkedList<>();
            for (int j = 0; j < 5; j++) {
                int index = (int) (Math.random() * relations.size());
                Relation relation = relations.get(index);
                relationModels.add(RelationInfoModel.builder()
                        .word(relation.getWord())
                        .meaning(relation.getMeaning())
                        .wordBaseName(relation.getWordBase().getName())
                        .build());
                relations.remove(index);
            }
            connectList.add(relationModels);
        }
        return connectList;
    }
    public List<RelationInfoModel> getInsert(WordBase wordBase) {
        List<Relation> relations = wordBase.getRelations();
        List<RelationInfoModel> relationModels = new LinkedList<>();
        for (int i = 0; i < 20; i++) {
            int index = (int) (Math.random() * relations.size());
            Relation relation = relations.get(index);
            relationModels.add(RelationInfoModel.builder()
                    .word(relation.getWord())
                    .meaning(relation.getMeaning())
                    .wordBaseName(relation.getWordBase().getName())
                    .build());
            relations.remove(index);
        }
        //scramble relationModels
        Collections.shuffle(relationModels);
        return relationModels;
    }
    public Map<String, Object> getRandom(WordBase wordBase) {
        List<Relation> relations = wordBase.getRelations();
        int mode = (int) (Math.random() * 3);
        if (mode == 0) {
            return Map.of("mode", "choice", "quest", getSingleChoice(relations));
        } else if (mode == 1) {
            return Map.of("mode", "insert", "quest", getSingleInsert(relations));
        } else {
            return Map.of("mode", "connect", "quest", getSingleConnect(relations));
        }
    }

}
