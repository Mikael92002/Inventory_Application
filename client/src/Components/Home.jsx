import CategoryCard from "./CategoryCard";

const Home = ({ categoryArray }) => {
  return (
    <div className="category-card-container">
      {categoryArray.map((category) => {
        return (
          <CategoryCard
            key={category.id}
            category={category.category}
            quantity={category.item.length}
            item ={category.item}
          ></CategoryCard>
        );
      })}
    </div>
  );
};

export default Home;
