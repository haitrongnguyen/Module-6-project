package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Cart;
import com.example.webbanaoquantreem.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ICartService{
    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart findCart(Long id) {
        return cartRepository.findCartByAccountId(id);
    }

    @Override
    public Cart save(Cart cart) {
       Cart cart1 = cartRepository.save(cart);
       return cart1;
    }

    @Override
    public Cart findById(Long cartId) {
        return cartRepository.findById(cartId).get();
    }

    @Override
    public List<Cart> findAllByAccountId(Long id) {
        return cartRepository.findAllCartByAccountId(id);
    }
}
