package com.test.jobbb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class JobPost {

      @Id
    private int postId;
    private String postDesc;
    private String postProfile;
    private int reqExperience;
    private List<String> postTechStack;
}
