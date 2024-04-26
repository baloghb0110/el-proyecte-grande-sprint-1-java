package com.codecool.service.email;

import com.codecool.dto.access.EmailDetailsDTO;
import com.codecool.exception.EmailResetException;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {
  @Value("${spring.mail.username}") private String sender;
  private final JavaMailSender javaMailSender;

  @Autowired
  public EmailServiceImpl(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
  }

  @Override
  public void sendEmail(EmailDetailsDTO emailDetailsDTO) {
    try {
      InternetAddress emailAddress = new InternetAddress(emailDetailsDTO.recipient());
      emailAddress.validate();

      Properties properties = new Properties();
      Session session = Session.getDefaultInstance(properties);
      MimeMessage mailMessage = new MimeMessage(session);

      mailMessage.setFrom(sender);
      mailMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(emailDetailsDTO.recipient()));
      mailMessage.setSubject(emailDetailsDTO.subject());
      mailMessage.setContent(emailDetailsDTO.messageBody(), "text/html");

      javaMailSender.send(mailMessage);
    } catch (MailSendException | MessagingException exception) {
      throw new EmailResetException("Enter a valid email to reset.");
    }
  }
}
