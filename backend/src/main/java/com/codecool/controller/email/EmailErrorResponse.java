package com.codecool.controller.email;

import lombok.Getter;

@Getter
public class EmailErrorResponse {
  private final int status;
  private final String message;
  private final long timestamp;

  protected EmailErrorResponse(int status, String message, long timestamp) {
    this.status = status;
    this.message = message;
    this.timestamp = timestamp;
  }
}
