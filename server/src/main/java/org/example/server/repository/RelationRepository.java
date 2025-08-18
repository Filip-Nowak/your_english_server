package org.example.server.repository;

import org.example.server.entity.Relation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelationRepository extends JpaRepository<Relation,Long> {
}
