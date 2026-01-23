import CategoryCard from "./CategoryCard";
import { useState } from "react";

const Home = ({
  categoryArray,
  deleteItem,
  deleteCategory,
  addCategory,
  setItemCategory,
  setCategoriesState,
}) => {
  const [categoryInput, setCategoryInput] = useState("");

  function handleCategoryInput(value) {
    setCategoryInput(value);
  }

  return (
    <>
      <label htmlFor="categoryName">
        <input
          value={categoryInput}
          type="text"
          name="categoryName"
          id="categoryName"
          onChange={(e) => handleCategoryInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === "enter") {
              addCategory(categoryInput, setCategoriesState, categoryArray);
            }
          }}
        />
        <button
          onClick={() =>
            addCategory(categoryInput, setCategoriesState, categoryArray)
          }
        >
          Add New Category
        </button>
      </label>
      <div className="category-card-container">
        {categoryArray.length > 0 ? (
          categoryArray.map((category) => {
            let itemQty = 0;
            for (let i = 0; i < category.item.length; i++) {
              itemQty += category.item[i].qty;
            }

            return (
              <CategoryCard
                key={category.id}
                category={category.category}
                quantity={itemQty}
                item={category.item}
                deleteItem={deleteItem}
                deleteCategory={deleteCategory}
                setItemCategory={setItemCategory}
                setCategoriesState={setCategoriesState}
              ></CategoryCard>
            );
          })
        ) : (
          <h2>
            <strong>No Items in inventory!</strong>
          </h2>
        )}
      </div>
    </>
  );
};

export default Home;
