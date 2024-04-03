package com.example.webbanaoquantreem.controller;


import com.example.webbanaoquantreem.model.*;
import com.example.webbanaoquantreem.model.dto.AccountDTO;
import com.example.webbanaoquantreem.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private IProductService productService;

    @Autowired
    private ICartService cartService;
    @Autowired
    private IAccountService accountService;

    @Autowired
    private ICartItemService cartItemService;
    @Autowired
    private ICategoryService categoryService;
    @Autowired
    private ILikeService likeService;
    @GetMapping("/home")
    public ResponseEntity<Page<Product>> getEmployeeList(@RequestParam(defaultValue = "") String searchName,

                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "0") Long categoryId) {
        Pageable pageable = PageRequest.of(page, 12);
//        Page<Product> productPage = productService.getAllProduct(searchName, pageable);
        if (categoryId==0){
            System.out.println("Khong có cate");
            Page<Product> productPage = productService.getAllProduct(searchName, pageable);
            return ResponseEntity.ok(productPage);
        }else {
            System.out.println(" có cate");

            Page<Product> productPage = productService.getAllProductT(searchName, pageable,categoryId);
            if (productPage.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return ResponseEntity.ok(productPage);
        }

    }

    @PostMapping("/user/add-to-cart")
    public ResponseEntity<?> addToCart(@RequestParam Long productId,
                                       @RequestParam Long accountId,
                                       @RequestParam(defaultValue = "1") Long quantity) {
        System.out.println("cccccccccccccccc");
        Cart cart = cartService.findCart(accountId);
        Account account = accountService.findById(accountId);
        Product product = productService.findById(productId);
        LocalDate date = LocalDate.now();
        Double price = product.getPrice();

        if (cart == null){
            System.out.println("tao");
            cartService.save(new Cart(date,account,false));
            Cart cart1 = cartService.findCart(accountId);
            CartItem cartItem = new CartItem(price,quantity,false,product,cart1);
            cartItemService.save(cartItem);

        }else {
            System.out.println("save cart");
            List<CartItem> cartItems = cartItemService.findCartItem(cart.getId());
            boolean checkExist = false;
            for(CartItem c: cartItems){
                if (c.getProduct().getId().equals(productId)){
                    checkExist = true;
                    c.setQuantity(c.getQuantity()+1);
                    cartItemService.save(c);
                    break;
                }

            }

            if (!checkExist){
                CartItem cartItem = new CartItem(price,quantity,false,product,cart);
                cartItemService.save(cartItem);
            }


        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/cart/{accountId}")
    public ResponseEntity<List<CartItem>> showCartDetail(@PathVariable Long accountId) {
        Cart cart = cartService.findCart(accountId);
        Account account = accountService.findById(accountId);
        LocalDate date = LocalDate.now();
        if (cart == null){
            Cart cart1 = cartService.save(new Cart(date,account,false));
            List<CartItem> cartItems = cartItemService.findCartItem(cart1.getId());
            return new ResponseEntity<>(cartItems,HttpStatus.OK);
        }
        List<CartItem> cartItems = cartItemService.findCartItem(cart.getId());
        return new ResponseEntity<>(cartItems,HttpStatus.OK);
    }

    @GetMapping("/user/cartId/{accountId}")
    public ResponseEntity<Long> getCartId(@PathVariable Long accountId) {
        Cart cart = cartService.findCart(accountId);
        return new ResponseEntity<>(cart.getId(),HttpStatus.OK);
    }


    @GetMapping("/user/cart/sum/{accountId}")
    public ResponseEntity<Double> getSum(@PathVariable Long accountId) {
        Cart cart = cartService.findCart(accountId);
        System.out.println(cart);
        Double sum = 0.0;
        List<CartItem> cartItems = cartItemService.findCartItem(cart.getId());
        for (CartItem c: cartItems){
            sum= sum + c.getPrice()*c.getQuantity();
        }
        System.out.println("sum " + sum);
        return new ResponseEntity<>(sum,HttpStatus.OK);
    }
    @GetMapping("/home/product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Product product = productService.findById(id);
        return new ResponseEntity<Product>(product,HttpStatus.OK);
    }
    @GetMapping("/user/cart/plus/{id}")
    public ResponseEntity<?> plusQuantity(@PathVariable Long id) {

        CartItem cartItem = cartItemService.findById(id);

            System.out.println("Cong 1");
            cartItem.setQuantity(cartItem.getQuantity()+1);
            cartItemService.save(cartItem);
            return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/user/cart/div/{id}")
    public ResponseEntity<?> divQuantity(@PathVariable Long id) {
        System.out.println("Tru 1");
        CartItem cartItem = cartItemService.findById(id);
        cartItem.setQuantity(cartItem.getQuantity()-1);
        cartItemService.save(cartItem);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/cart/delete/{id}")
    public ResponseEntity<?>removeCartItem(@PathVariable Long id) {
        cartItemService.removeCartItem(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/home/cate")
    public ResponseEntity<List<Category>>getAllCate() {
        List<Category> categories = categoryService.findAll();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @GetMapping("/user/like/{productId}/{accountId}")
    public ResponseEntity<?> addLike(@PathVariable Long productId, @PathVariable Long accountId) {
        if(likeService.checkLike(accountId,productId) == null){
            System.out.println(productId+" "+accountId);
            likeService.addLike(productId, accountId);
            Product product = productService.findById(productId);
            product.setViewer(product.getViewer()+1);
            productService.save(product);
        }else {
            System.out.println(productId+" "+accountId);
            likeService.deleteByPrAc(productId, accountId);
            Product product = productService.findById(productId);
            product.setViewer(product.getViewer()-1);
            productService.save(product);
        }

        return ResponseEntity.ok().build();
    }
    @GetMapping("/user/check")
    public ResponseEntity<List<Like>>checkLike(@RequestParam Long accountId) {
        List<Like> likes = likeService.findAllLike(accountId);
        return new ResponseEntity<>(likes,HttpStatus.OK);
    }

    @GetMapping("/home/like")
    public ResponseEntity<List<Product>> getProductManyLike() {
        List<Product> products = productService.getProductManyLike();
        return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
    }

    @GetMapping("/user/checkout")
    public ResponseEntity<?>checkout(@RequestParam Long cartId,
                                                @RequestParam Double amount) {
        System.out.println("thanh toan" +cartId + " "+amount);
        Cart cart = cartService.findById(cartId);
        List<CartItem> cartItems= cartItemService.findCartItem(cartId);
        for (CartItem c: cartItems){
            c.getProduct().setQuantity(c.getProduct().getQuantity()-c.getQuantity());
            productService.save(c.getProduct());
        }
        cart.setTotalPrice(amount);
        cart.setStatus(true);
        cartService.save(cart);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/account")
    public ResponseEntity<?>getAccount(@RequestParam Long accountId) {
        Account account = accountService.findById(accountId);
        AccountDTO accountDTO = new AccountDTO();
        BeanUtils.copyProperties(account,accountDTO);
        return new ResponseEntity<>(accountDTO,HttpStatus.OK);
    }

    @PatchMapping("/user/account/update")
    public ResponseEntity<?>updateAccount(@RequestBody @Valid AccountDTO accountDTO, BindingResult bindingResult) {
        System.out.println(accountDTO.getId());
        Account account = accountService.findById(accountDTO.getId());
            BeanUtils.copyProperties(accountDTO,account);
            accountService.save(account);
        return new ResponseEntity<>(account,HttpStatus.OK);
    }

    @PostMapping("/admin/add-product")
    public ResponseEntity<?>addProduct(@RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping ("/admin/save-product")
    public ResponseEntity<?>saveProduct(@RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/history/{id}")
    public ResponseEntity<?>getAllCarts(@PathVariable Long id) {
//        productService.save(product);
        List<Cart> cartList = cartService.findAllByAccountId(id);
        return new ResponseEntity<>(cartList,HttpStatus.OK);
    }

    @GetMapping("/user/getCartItem/{id}")
    public ResponseEntity<?>getCartItemByCartId(@PathVariable Long id) {
        List<CartItem> cartItems = cartItemService.findCartItemByCartId(id);
        return new ResponseEntity<>(cartItems,HttpStatus.OK);
    }

    @GetMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        return new ResponseEntity<>("Success. Back to page Login",HttpStatus.OK);
    }





}
