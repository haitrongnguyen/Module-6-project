package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Like;

import java.util.List;

public interface ILikeService {
    void addLike(Long productId, Long accountId);

    Like checkLike(Long accountId, Long productId);

    List<Like> findAllLike(Long accountId);

    void deleteByPrAc(Long productId, Long accountId);
}
