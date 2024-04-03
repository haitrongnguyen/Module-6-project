package com.example.webbanaoquantreem.repository;

import com.example.webbanaoquantreem.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query(value = "select * from product where product.name like :name", nativeQuery = true)
    Page<Product> getAllProduct(@Param("name") String name, Pageable pageable);

//    @Query(value = "SELECT * FROM product WHERE product.name LIKE :name", nativeQuery = true)
//    Page<Product> getProductT(@Param("name") String name, Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE product.name LIKE :name and category_id = :categoryId", nativeQuery = true)
    Page<Product> getProductT(@Param("name") String name, Pageable pageable,@Param("categoryId") Long categoryId);

    @Query(value = "SELECT * FROM product WHERE product.name LIKE :name and (category_id = :categoryId and category_id)", nativeQuery = true)
    Page<Product> getProductTiep(@Param("name") String name, Pageable pageable,@Param("categoryId") Long categoryId);

    @Query(value =
            "SELECT *\n" +
            "FROM product\n" +
            "ORDER BY viewer DESC\n" +
            "LIMIT 9;", nativeQuery = true)
    List<Product> getProductManyLike();
}
