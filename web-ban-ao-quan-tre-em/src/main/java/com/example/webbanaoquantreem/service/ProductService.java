package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Product;
import com.example.webbanaoquantreem.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService{
    @Autowired
    private ProductRepository productRepository;
    @Override
    public Page<Product> getAllProduct(String searchName, Pageable pageable) {
        return productRepository.getAllProduct("%" + searchName.toLowerCase().trim() + "%",pageable);
    }

    @Override
    public Product findById(Long productId) {
        return productRepository.findById(productId).get();
    }

    @Override
    public Page<Product> getAllProductT(String searchName, Pageable pageable, Long categoryId) {
        return productRepository.getProductT("%" + searchName.trim() + "%",pageable,categoryId);
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

//    @Override
//    public Page<Product> getAllProduct(String searchName, Pageable pageable) {
//        return null;
//    }

//    @Override
//    public Page<Product> getAllProduct(String searchName, Pageable pageable) {
//        return productRepository.getProductT("%" + searchName.trim() + "%",pageable);
//    }

    @Override
    public Page<Product> getAllProductTiep(String searchName, Pageable pageable, Long categoryId) {
        return productRepository.getProductTiep("%" + searchName.trim() + "%",pageable,categoryId);
    }

    @Override
    public List<Product> getProductManyLike() {
        return productRepository.getProductManyLike();
    }

}
