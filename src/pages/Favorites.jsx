import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    // Load Favorites from Local Storage
    const loadFavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
        setFavorites(savedFavorites);
    };

    // Remove Recipe from Favorites
    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(recipe => recipe.idMeal !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites-page">
            <h2>My Favorite Recipes ❤️</h2>
            {favorites.length > 0 ? (
                <div className="favorites-grid">
                    {favorites.map(recipe => (
                        <div key={recipe.idMeal} className="recipe-card">
                            <Link to={`/recipe/${recipe.idMeal}`}>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" />
                                <h4>{recipe.strMeal}</h4>
                            </Link>
                            <button onClick={() => removeFromFavorites(recipe.idMeal)}
                                style={{
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    padding: "8px",
                                    marginTop: "5px",
                                    cursor: "pointer",
                                    borderRadius: "5px"
                                }}>
                                Remove ❌
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorite recipes yet. <Link to="/">Go explore!</Link></p>
            )}
        </div>
    );
};

export default Favorites;
