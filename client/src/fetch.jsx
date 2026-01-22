export async function getAllData() {
  try {
    const response = await fetch(`/api`);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error(err);
  }
}
export async function deleteItem(itemID) {
  try {
    const response = await fetch(`/api/items/${itemID}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      throw Error(response.status);
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function deleteCategory(categoryName) {
  try {
    const response = await fetch(`/api/category/${categoryName}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      throw Error(response.status);
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function addCategory(categoryName) {
  try {
    const response = await fetch(`/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: categoryName }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw Error("Server error: " + response.status);
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function addItem(categoryName, item, price, imageURL) {
  try {
    const response = await fetch(`api/items`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        category: categoryName,
        item: item,
        price: price,
        imageURL: imageURL,
      }),
    });
    if (response.ok) {
      console.log("Item successfully added");
      return response.json();
    } else {
      throw Error("Server error: " + response.status);
    }
  } catch (err) {
    console.error(err);
  }
}
