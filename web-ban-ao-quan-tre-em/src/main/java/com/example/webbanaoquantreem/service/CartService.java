package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Account;
import com.example.webbanaoquantreem.model.Cart;
import com.example.webbanaoquantreem.repository.CartItemRepository;
import com.example.webbanaoquantreem.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.util.List;

@Service
public class CartService implements ICartService{
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private AccountService accountService;

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

    @Override
    public void sendMail(Account account, Cart cart) {
        String to = account.getEmail();
        String subject = "Confirm checkout";
        String templateName = "mail-checkout";
        Context context = new Context();
        context.setVariable("listCartItem", cartItemRepository.findByCart(cart.getId()));
        context.setVariable("cart",cart);
        context.setVariable("account",account);
        accountService.sendEmailWithHtmlTemplate(to,subject,templateName,context);
    }

    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }
}
