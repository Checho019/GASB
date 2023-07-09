package com.example.demo.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="E<%= nombreClase %>")
public class <%= nombreClase %> {

    private static final Long serialVersionUID = 1L;

    @Id
    @Column(name = "<%= ncl%>id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long <%= ncl %>Id;

    <% atributos.forEach(atributo => { %>
    @Column(name = "<%= atributo.nombre %>")
    private <%= atributo.tipo %> <%= atributo.nombre %>;
    <% }); %>

}
