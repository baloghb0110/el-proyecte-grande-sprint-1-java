package com.codecool.service.transactionCategory;

import com.codecool.dto.category.NewCategoryDTO;
import com.codecool.entity.TrackeroUser;
import com.codecool.entity.TransactionCategory;
import com.codecool.repository.TransactionCategoryRepository;
import com.codecool.repository.UserRepository;
import com.codecool.service.user.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionCategoryService {
  private final TransactionCategoryRepository transactionCategoryRepository;
  private final UserRepository userRepository;

  @Autowired
  public TransactionCategoryService(TransactionCategoryRepository transactionCategoryRepository, UserRepository userRepository) {
    this.transactionCategoryRepository = transactionCategoryRepository;
    this.userRepository = userRepository;
  }

  public List<TransactionCategory> getAll() {
    return transactionCategoryRepository.findAll();
  }

  @Transactional
  public void removeCategory(TrackeroUser user, int categoryId){
    TransactionCategory currentCategory = user.getCategories()
            .stream()
            .filter(category -> category.getId() == categoryId)
            .findFirst()
            .get();
    user.getCategories().remove(currentCategory);

    userRepository.save(user);
  }

  public void addNewCategory(NewCategoryDTO newCategoryDTO, TrackeroUser trackeroUser){
    if(!categoryIsAvailableInDatabase(newCategoryDTO.name())){
        TransactionCategory transactionCategory = new TransactionCategory();
        transactionCategory.setName(newCategoryDTO.name());
        transactionCategoryRepository.save(transactionCategory);
    }

    if(!checkUsersCategoryList(trackeroUser, newCategoryDTO.name())){
      trackeroUser
              .getCategories()
              .add(transactionCategoryRepository
                      .findByName(newCategoryDTO.name()));
      userRepository.save(trackeroUser);
    }
  }

  private boolean checkUsersCategoryList(TrackeroUser trackeroUser, String newCategoryName){
      return trackeroUser.getCategories()
              .stream()
              .anyMatch(category -> category.getName().equals(newCategoryName));
  }

  private boolean categoryIsAvailableInDatabase(String categoryName){
    TransactionCategory transactionCategory = transactionCategoryRepository.findByName(categoryName);
    return transactionCategory != null && transactionCategory.getName().equals(categoryName);
  }
}

