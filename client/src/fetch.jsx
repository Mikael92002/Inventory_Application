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
