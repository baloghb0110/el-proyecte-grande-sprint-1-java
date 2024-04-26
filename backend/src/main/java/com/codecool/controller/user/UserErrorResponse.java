package com.codecool.controller.user;

import lombok.Getter;

@Getter
public class UserErrorResponse {
  private final int status;
  private final String message;
  private final long timestamp;

  protected UserErrorResponse(int status, String message, long timestamp) {
    this.status = status;
    this.message = message;
    this.timestamp = timestamp;
  }
}
