package com.test.jobbb.service;


import com.test.jobbb.model.JobPost;
import com.test.jobbb.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class JobService {
@Autowired
JobRepository repo;


    public void add(JobPost pj) {

        repo.save(pj);
    }
    public List<JobPost> back()
    {
        System.out.println("hehee");
       return repo.findAll();
    }

    public void update(JobPost pj,int id) {

           repo.save(pj);

    }



    public void delete(int id) {

        repo.deleteById(id);
    }

    public void load() {

        List<JobPost> list=new ArrayList<>(Arrays.asList(new JobPost(1,"java developer","must be a good man",3,new ArrayList<>())));
        repo.saveAll(list);
    }


    public JobPost getJob(int postId) {

        return repo.findById(postId).orElse(new JobPost());
    }
}
