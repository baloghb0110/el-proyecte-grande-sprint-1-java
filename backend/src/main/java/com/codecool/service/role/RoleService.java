package com.codecool.service.role;

import com.codecool.entity.Role;
import com.codecool.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
  private final RoleRepository roleRepository;

  @Autowired
  public RoleService(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  public Role findRoleByName(String role) {
    return roleRepository.findByName(role);
  }
}
