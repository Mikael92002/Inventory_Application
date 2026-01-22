import { useState } from "react";
import { useEffect } from "react";
import { getAllData, deleteItem, deleteCategory, addCategory } from "./fetch";
import { useParams } from "react-router";
import { Link } from "react-router";
import ErrorPage from "./ErrorPage";
import Home from "./Components/Home";
import Header from "./Components/Header";
import ItemAddForm from "./Components/ItemAddForm";

function Page() {
  const { currPage } = useParams();
  const [categories, setCategories] = useState([]);
  const [itemCategory, setItemCategory] = useState("");

  // delete logic (in sql):
  // if user selects to delete whole category:
  // DELETE FROM inventory WHERE category = "categoryName"
  // if user selects to delete item from category:
  // DELETE FROM inventory WHERE id = category.item.id <-- currently trying this
  // OR:
  // DELETE FROM inventory WHERE category = "categoryName" AND item = "itemName"

  function makeCategoryArray(data) {
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
    console.log(arr);
    return arr;
  }

  async function deleteItemFromViewAndDb(itemID) {
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

  async function deleteCategoryFromViewAndDb(categoryName) {
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

  async function addCategoryToViewAndDb(categoryName) {
    if (categoryInputValidation(categoryName)) {
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
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Category already exists!");
    }
  }

  function categoryInputValidation(categoryName) {
    let validatedCategoryName = categoryName.trim().toLowerCase();
    for (let category of categories) {
      if (category.category.trim().toLowerCase() === validatedCategoryName) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const dataArray = await getAllData();
        console.log(dataArray);
        const newCategoryArray = makeCategoryArray(dataArray);
        setCategories(newCategoryArray);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Header></Header>
      {currPage === undefined ? (
        <>
          <Home
            categoryArray={categories}
            deleteItem={deleteItemFromViewAndDb}
            deleteCategory={deleteCategoryFromViewAndDb}
            addCategory={addCategoryToViewAndDb}
            setItemCategory={setItemCategory}
          ></Home>
          <div></div>
        </>
      ) : currPage === "itemForm" ? (
        <>
          <ItemAddForm category={itemCategory}></ItemAddForm>
        </>
      ) : (
        <ErrorPage></ErrorPage>
      )}
    </>
  );
}

export default Page;
