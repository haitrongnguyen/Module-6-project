package com.example.webbanaoquantreem.model.dto;

import com.example.webbanaoquantreem.model.CartItem;

import java.util.List;

public class CartIemDTO {
    private List<CartItem> cartItems;
    private Double sum;

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public Double getSum() {
        return sum;
    }

    public void setSum(Double sum) {
        this.sum = sum;
    }

    public CartIemDTO() {
    }

    public CartIemDTO(List<CartItem> cartItems, Double sum) {
        this.cartItems = cartItems;
        this.sum = sum;
    }
}
