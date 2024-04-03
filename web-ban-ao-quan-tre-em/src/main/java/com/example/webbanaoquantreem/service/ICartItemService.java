package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.CartItem;

import java.util.List;

public interface ICartItemService {
    void save(CartItem cartItem);

    CartItem findById(Long id);

    void removeCartItem(Long id);

    List<CartItem> findCartItem(Long id);

    List<CartItem> findCartItemByCartId(Long id);
}
