package com.codecool.controller.user;

import org.springframework.stereotype.Service;

@Service
public class UserMessages {
  final String LOGIN_ERROR_MESSAGE = "The login was unsuccessful, please try again.";
  final String FORM_ERROR_MESSAGE = "The form submission was unsuccessful, please try again.";
  final String WELCOME_EMAIL_SUBJECT = "Thank you for registering at Trackero!";
  final String WELCOME_EMAIL_BODY = """
    <main>
      <h1>Welcome at Trackero!</h1>
      <p>We hope you will enjoy your time with our application!</p>
      <p>Let us know if you have any issues, suggestions or anything else</p>
    </main>
  """;
  final String PASSWORD_RESET_SUBJECT = "A password reset for this account was requested.";
  final String PASSWORD_RESET_BODY = """
    <main>
      <h1>Hi there! Here is your password reset link, use it wisely:</h1>
      <p>http://localhost:5173/password-reset/{0}</p>
      <p>Thank you for using Trackero!</p>
    </main>
  """;

  public UserMessages() {}
}
