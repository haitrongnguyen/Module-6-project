package com.example.webbanaoquantreem.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDTO {
    @NotNull
    private String email;
    @NotNull
    private String password;
    @NotNull
    private String newPassword;
    @NotNull
    private String confirmPassword;
}
