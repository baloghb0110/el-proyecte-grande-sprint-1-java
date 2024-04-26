package com.codecool.config.postgreSQL;

import java.sql.Connection;

public interface PostgreSQL {
  Connection getConnection();
}
