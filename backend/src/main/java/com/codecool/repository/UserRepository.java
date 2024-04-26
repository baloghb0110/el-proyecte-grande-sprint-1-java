package com.codecool.repository;

import com.codecool.entity.TrackeroUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<TrackeroUser, Integer> {
  TrackeroUser save(TrackeroUser trackeroUser);

  @Query(value =
    """
      SELECT
        *
      FROM
        users
      WHERE
        email = :email
      """, nativeQuery = true
  )
  Optional<TrackeroUser> findByEmail(@Param("email") String email);
}
