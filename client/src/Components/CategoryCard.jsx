import { Link } from "react-router";

const CategoryCard = ({
  category,
  quantity,
  item,
  deleteItem,
  deleteCategory,
  setItemCategory,
}) => {
  return (
    <div className="category-card">
      <h2 className="category-title">
        <span>{category}</span>
        <svg
          fill="black"
          width="20px"
          height="20px"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          className="trash-svg"
          onClick={() => {
            confirm(
              `Are you sure you want to delete this category: ${category}`,
            )
              ? deleteCategory(category)
              : null;
          }}
        >
          <path d="M20 18h2v16h-2z" />
          <path d="M24 18h2v16h-2z" />
          <path d="M28 18h2v16h-2z" />
          <path d="M12 12h26v2H12z" />
          <path d="M30 12h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v1z" />
          <path d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24 2-.2 1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24 2 .2-1.8 24C34 38.7 32.6 40 31 40z" />
        </svg>
        <span>
          <Link to="/itemForm" onClick={()=> setItemCategory(category)}>Add item</Link>
        </span>
      </h2>
      <strong>
        {quantity > 1 ? (
          <>{quantity} items in this category</>
        ) : quantity === 1 ? (
          <>{quantity} item in this category</>
        ) : (
          <>No item in this category!</>
        )}
      </strong>
      <div className="item-container">
        {item.map((item) => {
          return (
            <div key={item.id} className="item">
              <span className="item-name">
                {item.name} <span>Qty: {item.qty}</span>
              </span>
              <svg
                fill="black"
                width="20px"
                height="20px"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                className="trash-svg"
                onClick={() => {
                  confirm(
                    `Are you sure you want to delete this item: ${item.name}`,
                  )
                    ? deleteItem(item.id)
                    : null;
                }}
              >
                <path d="M20 18h2v16h-2z" />
                <path d="M24 18h2v16h-2z" />
                <path d="M28 18h2v16h-2z" />
                <path d="M12 12h26v2H12z" />
                <path d="M30 12h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v1z" />
                <path d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24 2-.2 1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24 2 .2-1.8 24C34 38.7 32.6 40 31 40z" />
              </svg>
            </div>
          );
        })}
      </div>
      {/* When following is clicked, sql query WHERE category = given category */}
      {/* Should display all items in clicked category: */}
      {/* <Link to="/item">Click to expand category</Link> */}
    </div>
  );
};

export default CategoryCard;
