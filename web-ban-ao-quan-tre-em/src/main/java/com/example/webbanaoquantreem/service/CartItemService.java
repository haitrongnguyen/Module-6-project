package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.CartItem;
import com.example.webbanaoquantreem.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemService implements ICartItemService{
    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public void save(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem findById(Long id) {
        return cartItemRepository.findById(id).get();
    }

    @Override
    public void removeCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }

    @Override
    public List<CartItem> findCartItem(Long id) {
        return cartItemRepository.findByCart(id);
    }

    @Override
    public List<CartItem> findCartItemByCartId(Long id) {
        return cartItemRepository.findByCart(id);
    }
}
