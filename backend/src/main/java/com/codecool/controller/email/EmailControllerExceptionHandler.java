package com.codecool.controller.email;

import com.codecool.exception.EmailResetException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class EmailControllerExceptionHandler {
  @ExceptionHandler(value = { EmailResetException.class })
  public ResponseEntity<EmailErrorResponse> handleEmptyRegisterFormException(EmailResetException exception) {
    HttpStatus badRequestStatus = HttpStatus.BAD_REQUEST;

    EmailErrorResponse error = new EmailErrorResponse(
      badRequestStatus.value(),
      exception.getMessage(),
      System.currentTimeMillis()
    );

    return new ResponseEntity<>(error, badRequestStatus);
  }
}
