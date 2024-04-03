package com.example.webbanaoquantreem.model.dto;

import com.example.webbanaoquantreem.model.Category;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

public class ProductDTO {
    private Long id;

    private String name;
    private Double price;
    private String image;
    private String producer;
    private String description;
    private Long viewer;

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    private Long quantity;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    private Category category;
}
