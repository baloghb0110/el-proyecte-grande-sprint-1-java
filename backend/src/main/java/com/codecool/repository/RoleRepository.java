package com.codecool.repository;

import com.codecool.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
  Role findByName(String role);
}
