package com.example.demo.controllers;

import com.example.demo.entities.<%= nombreClase %>;
import com.example.demo.repositories.<%= nombreClase %>Repository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RequestMapping("/<%= ncl %>")
@RestController
public class <%= nombreClase %>Controller {

    private final <%= nombreClase %>Repository <%= ncl %>Repository;
    <%= nombreClase %>Controller (<%= nombreClase %>Repository <%= ncl %>Repository){
        this.<%= ncl %>Repository = <%= ncl %>Repository;
    }

    @GetMapping("findall")
    public ResponseEntity<List<<%= nombreClase %>>> get<%= nombreClase %>(){
        return ResponseEntity.ok(<%= ncl %>Repository.findAll());
    }

    @GetMapping("findone/{id}")
    public ResponseEntity<<%= nombreClase %>> get<%= nombreClase %>(@PathVariable long id){
        <%= nombreClase %> <%= ncl %> = <%= ncl %>Repository.findById(id).orElse(null);
        if (<%= ncl %> == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(<%= ncl %>);
    }

    @PostMapping("add")
    public ResponseEntity<<%= nombreClase %>> add<%= nombreClase %>(@RequestBody <%= nombreClase %> <%= ncl %>){
        if (<%= ncl %>Repository.existsById(<%= ncl %>.get<%= nombreClase %>Id())) {
            return ResponseEntity.badRequest().build();
        }
        <%= ncl %>Repository.save(<%= ncl %>);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("findone/{id}")
                .buildAndExpand(<%= ncl %>.get<%= nombreClase %>Id())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<<%= nombreClase %>> delete<%= nombreClase %>(@PathVariable long id){
        if (!<%= ncl %>Repository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        <%= ncl %>Repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<<%= nombreClase %>>  update<%= nombreClase %> (@PathVariable long id, @RequestBody <%= nombreClase %> <%= ncl %>){
        if (!<%= ncl %>Repository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        <%= ncl %>.set<%= nombreClase %>Id(id);
        <%= ncl %>Repository.save(<%= ncl %>);
        return ResponseEntity.ok(<%= ncl %>);
    }
}
