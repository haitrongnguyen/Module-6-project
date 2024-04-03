package com.example.webbanaoquantreem.repository;

import com.example.webbanaoquantreem.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    @Query(value =
            "SELECT *\n" +
                    "FROM cart_item\n" +
                    "where cart_id = :id", nativeQuery = true)
    List<CartItem> findByCart(@Param("id") Long id);

}
