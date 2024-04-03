package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
//    Page<Product> getAllProduct(String searchName, Pageable pageable);

    Product findById(Long productId);

    Page<Product> getAllProductT(String searchName, Pageable pageable, Long categoryId);

    void save(Product product);

    Page<Product> getAllProduct(String searchName, Pageable pageable);

    Page<Product> getAllProductTiep(String searchName, Pageable pageable, Long categoryId);

    List<Product> getProductManyLike();
}
