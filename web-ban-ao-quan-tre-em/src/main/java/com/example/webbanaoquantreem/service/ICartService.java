package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Account;
import com.example.webbanaoquantreem.model.Cart;

import java.util.List;

public interface ICartService {
    Cart findCart(Long id);

    Cart save(Cart cart);

    Cart findById(Long cartId);

    List<Cart> findAllByAccountId(Long id);

    void sendMail(Account account, Cart cart);

    List<Cart> findAll();
}
