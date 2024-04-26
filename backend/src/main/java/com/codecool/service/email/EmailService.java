package com.codecool.service.email;

import com.codecool.dto.access.EmailDetailsDTO;

public interface EmailService {
  void sendEmail(EmailDetailsDTO emailDetailsDTO);
}
