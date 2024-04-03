package com.example.webbanaoquantreem.repository;

import com.example.webbanaoquantreem.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like,Long> {
    @Modifying
    @Transactional
    @Query(value = "insert into like_by(product_id,account_id) values(:productId,:accountId)",nativeQuery = true)
    void addLike(@Param("productId") Long productId, @Param("accountId") Long accountId);

    @Query(value = "select * from like_by where account_id = :accountId and product_id = :productId",nativeQuery = true)
    Like checkLike(@Param("accountId") Long accountId,@Param("productId") Long productId);

    @Query(value = "select * from like_by where account_id = :accountId",nativeQuery = true)
    List<Like> findAllLike(@Param("accountId") Long accountId);

    @Modifying
    @Transactional
    @Query(value = "delete from like_by where (product_id = :productId and account_id = :accountId)",nativeQuery = true)
    void deleteByPrAc(@Param("productId") Long productId, @Param("accountId") Long accountId);

}
