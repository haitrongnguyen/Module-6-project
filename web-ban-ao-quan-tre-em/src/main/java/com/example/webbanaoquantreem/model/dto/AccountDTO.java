package com.example.webbanaoquantreem.model.dto;

import com.example.webbanaoquantreem.model.Role;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private Long id;


    private String fullName;
    private Role role;
    private String password;
    private String image;

    private Date birthday;
    @NotNull
    private String phoneNumber;
    @NotNull

    private String address;
    @NotNull

    private String email;
    private Boolean isDelete =false;
}
