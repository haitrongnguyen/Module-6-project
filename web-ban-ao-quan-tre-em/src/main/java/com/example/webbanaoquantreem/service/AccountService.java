package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.auth.AuthenticationRequest;
import com.example.webbanaoquantreem.config.ApplicationConfig;
import com.example.webbanaoquantreem.model.Account;
import com.example.webbanaoquantreem.repository.AccountRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Optional;

@Service
public class AccountService implements IAccountService{
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private ApplicationConfig applicationConfig;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Override
    public Account findById(Long id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public boolean checkLogin(AuthenticationRequest request) {
        Optional<Account> account = accountRepository.findByEmailLogin(request.getEmail());

        if (!account.isPresent()){
            return false;
        }
        if (applicationConfig.passwordEncoder().matches(request.getPassword(),account.get().getPassword())){
            return true;
        }
        return false;
    }

    @Override
    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    @Override
    public boolean checkExist(String email) {
        Optional<Account> account = accountRepository.findByEmail(email);
        return account.isPresent();

    }

    @Override
    public void save(Account account) {
        accountRepository.save(account);
    }

    @Override
    public void sendMail(Account account) {
            String to = account.getEmail();
            String subject = "Confirm account";
            String templateName = "mail";
            Context context = new Context();
            context.setVariable("id", account.getId());
            sendEmailWithHtmlTemplate(to,subject,templateName,context);

        }

    public void sendEmailWithHtmlTemplate(String to, String subject, String templateName, Context context) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setTo(to);
            helper.setSubject(subject);
            String htmlContent = templateEngine.process(templateName, context);
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


}
