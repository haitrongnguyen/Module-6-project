package com.example.webbanaoquantreem.controller;

import com.example.webbanaoquantreem.auth.AuthenticationRequest;
import com.example.webbanaoquantreem.auth.AuthenticationResponse;
import com.example.webbanaoquantreem.config.JwtService;
import com.example.webbanaoquantreem.model.Account;
import com.example.webbanaoquantreem.model.Role;
import com.example.webbanaoquantreem.model.dto.AccountDTO;
import com.example.webbanaoquantreem.model.dto.LoginDto;
import com.example.webbanaoquantreem.model.dto.RegisterDTO;
import com.example.webbanaoquantreem.repository.RoleRepository;
import com.example.webbanaoquantreem.service.IAccountService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")

public class LoginController {
    @Autowired
    private IAccountService accountService;
    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RoleRepository repository;



    @PostMapping("/login")
    public ResponseEntity<LoginDto> authenticationUser(@RequestBody AuthenticationRequest request){

        boolean checkLogin = accountService.checkLogin(request);


        if (checkLogin){
            Account account = accountService.findByEmail(request.getEmail()).get();
            System.out.println("aaaaaaaâ");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = accountService.findByEmail(request.getEmail())
                    .orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            String token  = AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build().getToken();

            return new ResponseEntity<>(new LoginDto(token, account),HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO registerDTO , BindingResult bindingResult){
        String email = registerDTO.getEmail();
        boolean checkExist = accountService.checkExist(email);
        if (checkExist){
            return new ResponseEntity<>("Email is exist",HttpStatus.BAD_REQUEST);
        }else {
            Account account = new Account();
            registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
            System.out.println(registerDTO.getPassword());

            BeanUtils.copyProperties(registerDTO,account);
            account.setRole(repository.findById(2L).get());
            accountService.save(account);
            accountService.sendMail(account);
        }
        return new ResponseEntity<>("Success",HttpStatus.OK);
    }
    @PostMapping("/register/{id}")
    public ResponseEntity<?> confirm(@PathVariable Long id){
        Account account = accountService.findById(id);
        account.setDelete(false);
        accountService.save(account);
        return new ResponseEntity<>("Success. Back to page Login",HttpStatus.OK);
    }



}
