import CategoryCard from "./CategoryCard";

const Home = ({ categoryArray, deleteItem, deleteCategory }) => {
  return (
    <div className="category-card-container">
      {categoryArray.length > 0 ? (
        categoryArray.map((category) => {
          return (
            <CategoryCard
              key={category.id}
              category={category.category}
              quantity={category.item.length}
              item={category.item}
              deleteItem={deleteItem}
              deleteCategory={deleteCategory}
            ></CategoryCard>
          );
        })
      ) : (
        <h2>
          <strong>No Items in inventory!</strong>
        </h2>
      )}
    </div>
  );
};

export default Home;
