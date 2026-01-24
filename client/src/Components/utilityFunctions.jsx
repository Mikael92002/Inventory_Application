import { addCategory, deleteCategory, deleteItem } from "../fetch";

export function makeCategoryArray(data) {
    let arr = [];
    for (let dataItem of data) {
      const existingCategory = arr.find(
        (prevElement) => prevElement.category === dataItem.category,
      );
      if (existingCategory) {
        if (dataItem.item !== null) {
          existingCategory.item.push({
            id: dataItem.id,
            name: dataItem.item,
            price: dataItem.price,
            qty: dataItem.quantity,
            imgURL: dataItem.imageurl,
          });
        }
      } else {
        if (dataItem.item !== null) {
          arr.push({
            id: dataItem.id,
            category: dataItem.category,
            item: [
              {
                id: dataItem.id,
                name: dataItem.item,
                price: dataItem.price,
                qty: dataItem.quantity,
                imgURL: dataItem.imageurl,
              },
            ],
          });
        } else {
          arr.push({
            id: dataItem.id,
            category: dataItem.category,
            item: [],
          });
        }
      }
    }
    return arr;
  }

  export async function addCategoryToViewAndDb(categoryName, setCategories, categoriesArr, setInputField) {
    if (categoryInputValidation(categoryName, categoriesArr)) {
      try {
        const fetchResult = await addCategory(categoryName);
        const newCategory = {
          id: fetchResult.id,
          category: fetchResult.category,
          item: [],
        };
        if (fetchResult !== null) {
          setCategories((prevCategory) => {
            return [...prevCategory, newCategory];
          });
          setInputField("");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Category already exists!");
    }
  }

  export function categoryInputValidation(categoryName, categoriesArr) {
    let validatedCategoryName = categoryName.trim().toLowerCase();
    for (let category of categoriesArr) {
      if (category.category.trim().toLowerCase() === validatedCategoryName) {
        return false;
      }
    }
    return true;
  }

    export async function deleteItemFromViewAndDb(itemID, setCategories) {
    const resultOfDelete = await deleteItem(itemID);
    try {
      if (resultOfDelete) {
        setCategories((prevCategory) => {
          let newArr = [...prevCategory];
          for (let i = 0; i < newArr.length; i++) {
            let categoryItemArr = newArr[i].item;
            for (let j = 0; j < categoryItemArr.length; j++) {
              if (categoryItemArr[j].id === itemID) {
                categoryItemArr.splice(j, 1);
                break;
              }
            }
          }
          return newArr;
        });
      } else {
        throw Error("Delete item error");
      }
    } catch (err) {
      console.error(err);
    }
  }

  export async function deleteCategoryFromViewAndDb(categoryName, setCategories) {
    try {
      const resultOfDelete = await deleteCategory(categoryName);
      if (resultOfDelete) {
        setCategories((prevCategory) => {
          return prevCategory.filter((category) => {
            return category.category !== categoryName;
          });
        });
      } else {
        throw Error("Error at delete category");
      }
    } catch (err) {
      console.error(err);
    }
  }