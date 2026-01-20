const CategoryCard = ({ category, quantity, item }) => {
  return (
    <div className="category-card">
      <h1>{category}</h1>
      <p>{quantity} items in this category</p>
      {item.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
      {/* When following is clicked, sql query WHERE category = given category */}
      {/* Should display all items in clicked category: */}
      {/* <Link to="/item">Click to expand category</Link> */}
    </div>
  );
};

export default CategoryCard;
