const getLocalStorageItem = (getItemName) => {
  return window.localStorage.getItem(getItemName);
};

export default getLocalStorageItem;
