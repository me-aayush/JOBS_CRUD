package com.test.jobbb.repository;

import com.test.jobbb.model.JobPost;
import com.test.jobbb.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class JobRestController {




        @Autowired
      JobService jobservice;
        @GetMapping(path="Jobposts")
        @CrossOrigin(origins="http://localhost:3000")
    public List<JobPost> viewjobs()
    {
        return jobservice.back();

    }


    @GetMapping("/Jobposts/{id}")
    public JobPost getJob(@PathVariable int id) {
        return jobservice.getJob(id);
    }

    @PostMapping("Jobposts")
    public void  addjoby(@RequestBody JobPost pj)
    {
        jobservice.add(pj);
    }


    @PutMapping("Jobposts/{id}")
    public JobPost updateJob(@RequestBody JobPost jobPost,@PathVariable int id) {
        jobservice.update(jobPost,id);
        return jobservice.getJob(jobPost.getPostId());
    }

      @DeleteMapping("Jobposts/{id}")
    public String deletejob(@PathVariable int id)
      {
          jobservice.delete(id);
          return "deleted";
      }
      @GetMapping("/load")
    public String load()
      {
          jobservice.load();
          return "success";
      }

}
