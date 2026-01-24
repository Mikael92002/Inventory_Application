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

export async function addItem(data) {
  try {
    const response = await fetch(`/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.ok) {
      return [response, result];
    } else {
      return [response, result];
    }
  } catch (err) {
    console.error(err);
    return [null, null];
  }
}

export async function incrementItem(id){
  try{
    const response = await fetch(`/api/items/incrementItem/${id}`,{
      method: "PUT",
    })
    if(response.ok){
      window.location.href = "/";
    }
    else{
      throw Error(response.status);
    }
  }catch(err){
    console.error(err);
  }
}

export async function decrementItem(id){
  try{
    const response = await fetch(`/api/items/decrementItem/${id}`,{
      method: "PUT",
    })
    if(response.ok){
      window.location.href = "/";
    }
    else{
      throw Error(response.status);
    }
  }catch(err){
    console.error(err);
  }
}