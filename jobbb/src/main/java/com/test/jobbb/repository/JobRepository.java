package com.test.jobbb.repository;


import com.test.jobbb.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<JobPost,Integer> {


}

