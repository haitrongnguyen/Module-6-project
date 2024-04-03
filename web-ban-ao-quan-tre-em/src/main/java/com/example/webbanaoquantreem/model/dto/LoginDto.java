package com.example.webbanaoquantreem.model.dto;

import com.example.webbanaoquantreem.model.Account;


public class LoginDto {
    private String accessToken;
    private Account accountDTO;

    public LoginDto() {
    }

    public LoginDto(String accessToken, Account accountDTO) {
        this.accessToken = accessToken;
        this.accountDTO = accountDTO;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Account getAccountDTO() {
        return accountDTO;
    }

    public void setAccountDTO(Account accountDTO) {
        this.accountDTO = accountDTO;
    }
}
