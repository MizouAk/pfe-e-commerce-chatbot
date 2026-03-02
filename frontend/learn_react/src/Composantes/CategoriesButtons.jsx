// CategoriesButtons.jsx
import Button from "../Component/Buttons";
import "./CategoriesButtons.css";
import { useCategories } from "../Context/CategoriesContext";

function CategoriesButtons({ categoryId, setCategoryId }) {
  const { categories } = useCategories();

  return (
    <div className="categories-buttons">
      <Button
        name="Tous"
        className={categoryId === "" ? "active" : ""}
        onClick={() => setCategoryId("")}
      />

      {categories.map((c) => (
        <Button
          key={c.id}
          name={c.name}
          className={String(categoryId) === String(c.id) ? "active" : ""}
          onClick={() => setCategoryId(c.id)}
        />
      ))}
    </div>
  );
}

export default CategoriesButtons;