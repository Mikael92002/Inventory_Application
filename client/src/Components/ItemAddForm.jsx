const ItemAddForm = ({ category }) => {
  return (
    <>
      <form
        action="/api/items"
        method="POST"
      >
        <label htmlFor="item">
          Item name:
          <input type="text" name="item" id="item" required />
        </label>
        <label htmlFor="price">
          Price:
          <input type="number" name="price" id="price" required/>
        </label>
        <label htmlFor="imageURL">
          Image URL:
          <input type="text" name="imageURL" id="imageURL" />
        </label>
        <input type="hidden" name="category" value={category} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ItemAddForm;
