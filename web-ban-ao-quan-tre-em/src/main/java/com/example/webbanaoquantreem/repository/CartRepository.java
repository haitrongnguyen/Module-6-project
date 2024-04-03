package com.example.webbanaoquantreem.repository;

import com.example.webbanaoquantreem.model.Cart;
import com.example.webbanaoquantreem.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {

    @Query(value = "select * from cart where account_id = :id and status = false", nativeQuery = true)
    Cart findCartByAccountId(@Param("id") Long id );

    @Query(value = "select * from cart where account_id = :id order by cart.create_date desc", nativeQuery = true)
    List<Cart> findAllCartByAccountId(@Param("id") Long id);
}
