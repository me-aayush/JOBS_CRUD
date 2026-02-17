package com.test.jobbb;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.hibernate.internal.SessionFactoryLogging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.LoggerFactoryFriend;
import org.springframework.cglib.proxy.Factory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {

    private static Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);

    @Before("execution(* com.test.jobbb.service.JobService.*(..))")
    public void logmethodcall(JoinPoint jp) {
        LOGGER.info("method called  "+jp.getSignature().getName());
    }

    @After("execution(* com.test.jobbb.service.JobService.*(..))")
    public void logmethodcallexecuted(JoinPoint jp) {
        LOGGER.info("method executed  "+jp.getSignature().getName());
    }

    @AfterReturning("execution(* com.test.jobbb.service.JobService.*(..))")
    public void logmethodcallreturn(JoinPoint jp) {
        LOGGER.info("method eextuo su  "+jp.getSignature().getName());
    }
}
