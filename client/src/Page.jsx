import { useState } from "react";
import { useEffect } from "react";
import { getAllData } from "./fetch";
import { useParams } from "react-router";
import { Link } from "react-router";
import ErrorPage from "./ErrorPage";
import Home from "./Components/Home";

function Page() {
  const { currPage } = useParams();
  const [categories, setCategories] = useState([]);

  function makeCategoryArray(data) {
    let arr = [];
    for (let dataItem of data) {
      const existingCategory = arr.find(
        (prevElement) => prevElement.category === dataItem.category,
      );
      if (existingCategory) {
        if (dataItem.item !== null) {
          existingCategory.item.push({
            id: crypto.randomUUID(),
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
                id: crypto.randomUUID(),
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
      {currPage === undefined ? (
        <>
          <button onClick={() => console.log(categories)}>Click moi</button>
          <Home categoryArray={categories}></Home>
          <div></div>
        </>
      ) : (
        <ErrorPage></ErrorPage>
      )}
    </>
  );
}

export default Page;
