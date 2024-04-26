package com.codecool.controller.category;

import com.codecool.dto.category.NewCategoryDTO;
import com.codecool.entity.TrackeroUser;
import com.codecool.entity.TransactionCategory;
import com.codecool.service.transactionCategory.TransactionCategoryService;
import com.codecool.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final UserService userService;
    private final TransactionCategoryService transactionCategoryService;

    public CategoryController(UserService userService, TransactionCategoryService transactionCategoryService) {
        this.userService = userService;
        this.transactionCategoryService = transactionCategoryService;
    }

    @PostMapping(value = "/add", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> addCategory(@RequestBody NewCategoryDTO newCategoryDTO){
        User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TrackeroUser trackeroUser = userService.findUserByEmail(userDetails.getUsername());
        transactionCategoryService.addNewCategory(newCategoryDTO, trackeroUser);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/get-categories", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getCategories() {
        User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TrackeroUser trackeroUser = userService.findUserByEmail(userDetails.getUsername());
        List<TransactionCategory> categories = trackeroUser.getCategories();

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete-category")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> deleteCategory(@RequestBody int categoryId){
        User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TrackeroUser trackeroUser = userService.findUserByEmail(userDetails.getUsername());
        transactionCategoryService.removeCategory(trackeroUser, categoryId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
