package com.codecool.exception;

public class FormErrorException extends RuntimeException {
  public FormErrorException(String message) {
    super(message);
  }
}
