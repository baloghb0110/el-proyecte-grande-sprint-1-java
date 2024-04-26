package com.codecool.controller.user;

import com.codecool.exception.FormErrorException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserControllerExceptionHandler {
  @ExceptionHandler(value = { FormErrorException.class })
  public ResponseEntity<UserErrorResponse> handleEmptyRegisterFormException(FormErrorException exception) {
    HttpStatus notAcceptableStatus = HttpStatus.NOT_ACCEPTABLE;

    UserErrorResponse error = new UserErrorResponse(
      notAcceptableStatus.value(),
      exception.getMessage(),
      System.currentTimeMillis()
    );

    return new ResponseEntity<>(error, notAcceptableStatus);
  }
}
