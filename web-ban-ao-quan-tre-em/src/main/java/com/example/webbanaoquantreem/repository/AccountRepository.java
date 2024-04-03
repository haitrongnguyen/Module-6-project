package com.example.webbanaoquantreem.repository;

import com.example.webbanaoquantreem.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    Optional<Account> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query(value = "select * from account where email = :email and is_delete = false",nativeQuery = true)
    Optional<Account> findByEmailLogin(@Param("email") String email);
}
