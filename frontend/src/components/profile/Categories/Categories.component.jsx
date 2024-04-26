import { useEffect, useState } from 'react';
import './Categories.styles.css';
import { iconLibraryConfig, axiosConfigWithAuth } from '@src/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getProfileData from '@src/pages/Profile/Profile.page.hooks';
import { AddNewCategoryModal } from '@src/components/modal';

const Categories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, isDataLoading, isDataError, refetch } = getProfileData('category/get-categories');

  const handleDeleteCategory = async (categoryId) => {
    await axiosConfigWithAuth({
      method: 'DELETE',
      url: '/api/category/delete-category',
      data:JSON.stringify(categoryId),
    });
    refetch();
  };

  const handleOnClick = () => {
    setIsModalVisible(!isModalVisible);
    refetch();
  };

  const handleOnClickNewCategoryButton = () => {
    setIsModalVisible(true);
  };

  const listenForEscapeKey = (event) => {
    if (event.key === 'Escape') {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <div className='profile-categories'>
        <button onClick={handleOnClickNewCategoryButton}>Add new category</button>
        <table className={'rwd-table'}>
          <thead>
            <tr>
              <th>Category name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {isDataLoading ? (
              <tr>
                <td className={'table-loading'}>
                  <FontAwesomeIcon icon={iconLibraryConfig.faCircleNotch} spin className={'loading-icon'} />
                </td>
              </tr>
              ) : isDataError ? (
                <p>Error fetching data</p>
              ) : (
               data.map((category) => {
                return (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td><button onClick={() => handleDeleteCategory(category.id)}>Delete</button></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <AddNewCategoryModal
          isModalVisible={isModalVisible}
          handleOnKeyClose={listenForEscapeKey}
          handleOnClick={handleOnClick}
        />
      </div>
    </>
  );
};

export default Categories;
