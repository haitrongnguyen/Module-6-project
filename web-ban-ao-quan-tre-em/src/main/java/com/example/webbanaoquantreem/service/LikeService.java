package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Like;
import com.example.webbanaoquantreem.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService implements ILikeService{
    @Autowired
    private LikeRepository likeRepository;

    @Override
    public void addLike(Long productId, Long accountId) {
        likeRepository.addLike(productId,accountId);
    }

    @Override
    public Like checkLike(Long accountId, Long productId) {
        return likeRepository.checkLike(accountId,productId);
    }

    @Override
    public List<Like> findAllLike(Long accountId) {
        return likeRepository.findAllLike(accountId);
    }

    @Override
    public void deleteByPrAc(Long productId, Long accountId) {
        likeRepository.deleteByPrAc(productId,accountId);
    }
}
