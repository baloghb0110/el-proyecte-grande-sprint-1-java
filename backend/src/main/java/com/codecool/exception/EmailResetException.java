package com.codecool.exception;

import org.springframework.mail.MailSendException;

public class EmailResetException extends MailSendException {
  public EmailResetException(String message) {
    super(message);
  }
}
