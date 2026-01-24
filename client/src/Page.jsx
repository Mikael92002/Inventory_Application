import { useState } from "react";
import { useEffect } from "react";
import { getAllData } from "./fetch";
import { useParams } from "react-router";
import { Link } from "react-router";
import {
  makeCategoryArray,
  addCategoryToViewAndDb,
  deleteItemFromViewAndDb,
  deleteCategoryFromViewAndDb,
} from "./Components/utilityFunctions";
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

  // runs whenever component is mounted, so make use of refreshes and redirects:
  useEffect(() => {
    const getData = async () => {
      try {
        const dataArray = await getAllData();
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
            setCategoriesState={setCategories}
          ></Home>
          <div></div>
        </>
      ) : currPage === "itemForm" ? (
        <>
          <ItemAddForm
            category={itemCategory}
            categoryArray={categories}
          ></ItemAddForm>
        </>
      ) : (
        <ErrorPage></ErrorPage>
      )}
    </>
  );
}

export default Page;
