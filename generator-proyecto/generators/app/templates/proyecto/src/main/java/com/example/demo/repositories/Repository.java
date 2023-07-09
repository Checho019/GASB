package com.example.demo.repositories;

import com.example.demo.entities.<%= nombreClase %>;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface <%= nombreClase %>Repository extends JpaRepository<<%= nombreClase %>, Long> {
}
