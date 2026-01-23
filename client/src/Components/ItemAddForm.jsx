import { addItem } from "../fetch";
import { useState } from "react";

const ItemAddForm = ({ category, categoryArray }) => {
  const [errors, setErrors] = useState([]);

  // errors.map((error)=> {error.path === item && item})
  return (
    <>
      <form
        action="/api/items"
        method="POST"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <h3>Adding an item in {category}:</h3>
        {errors.map((error) => {
          return (
            <div key={error.path} style={{ color: "red" }}>
              {error.msg}
            </div>
          );
        })}
        <label htmlFor="item">
          Item name:
          <input type="text" name="item" id="item" required />
        </label>
        <label htmlFor="price">
          Price:
          <input type="number" name="price" id="price" required />
        </label>
        <label htmlFor="imageURL">
          Image URL:
          <input type="text" name="imageURL" id="imageURL" />
        </label>
        <button>Submit</button>
      </form>
      <button onClick={() => console.log(errors)}></button>
    </>
  );

  async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    // clean input and add category:
    formData.append("category", category);
    formData.set("item", formData.get("item").trim());

    let dataAsObjects = Object.fromEntries(formData);
    if (itemInCategoryAlreadyExists(dataAsObjects.item)) {
      setErrors([{ msg: "Item in this category already exists!" }]);
      return;
    }
    const fetchResult = await addItem(dataAsObjects);
    console.log(fetchResult);
    if (fetchResult[0].ok) {
      setErrors([]);
      console.log("Item successfully added");
      window.location.href = "/";
    } else {
      setErrors(fetchResult[1]);
    }
  }

  function itemInCategoryAlreadyExists(userItem) {
    for (let categoryItem of categoryArray) {
      if (categoryItem.category === category) {
        for (let itemArray of categoryItem.item) {
          if (
            itemArray.name.trim().toLowerCase() ===
            userItem.trim().toLowerCase()
          ) {
            return true;
          }
        }
        return false;
      }
    }
  }
};

export default ItemAddForm;
// perform a fetch above in button
