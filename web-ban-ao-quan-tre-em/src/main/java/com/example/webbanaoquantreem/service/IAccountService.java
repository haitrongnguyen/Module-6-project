package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.auth.AuthenticationRequest;
import com.example.webbanaoquantreem.model.Account;

import java.util.Optional;

public interface IAccountService {
    Account findById(Long id);

    boolean checkLogin(AuthenticationRequest request);

    Optional<Account> findByEmail(String email);

    boolean checkExist(String email);

    void save(Account account);

    void sendMail(Account account);

}
