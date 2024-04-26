package com.codecool.service.security;

import com.codecool.entity.Role;
import com.codecool.entity.TrackeroUser;
import com.codecool.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;

  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    TrackeroUser user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
    List<SimpleGrantedAuthority> roles = new ArrayList<>();

    for (Role role : user.getRoles()) {
      roles.add(new SimpleGrantedAuthority(role.getName()));
    }

    return new User(user.getEmail(), user.getHashedPassword(), roles);
  }
}
