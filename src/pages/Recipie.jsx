import { useParams } from "react-router-dom"; // Get ID from URL
import { useState, useEffect } from "react";
import axios from "axios";

const Recipie = () => {
    const { id } = useParams(); // Get id from URL
    const [recipie, setRecipie] = useState(null); // Store recipe
    const [favorites, setFavorites] = useState([]); // Store favorites

    useEffect(() => {
        fetchRecipie();
        loadFavorites(); // Check saved recipes
    }, [id]);

    // Fetch Recipe
    const fetchRecipie = async () => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            setRecipie(response.data.meals[0]);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    // Load Favorites from Local Storage
    const loadFavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
        setFavorites(savedFavorites);
    };

    // Save Recipe to Favorites
    const saveToFavorites = () => {
        let savedFavorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

        if (!savedFavorites.some(fav => fav.idMeal === recipie.idMeal)) {
            savedFavorites.push(recipie);
            localStorage.setItem("favoriteRecipes", JSON.stringify(savedFavorites));
            alert("Recipe saved to favorites! ❤️");
        } else {
            alert("Recipe is already in favorites!");
        }
    };

    return (
        <div className="recipe-page">
            {recipie ? (
                <>
                    <h2>{recipie.strMeal}</h2>
                    <img src={recipie.strMealThumb} alt={recipie.strMeal} width="300" />
                    <p>{recipie.strInstructions}</p>

                    {/* Embed YouTube Video */}
                    {recipie.strYoutube && (
                        <iframe 
                            width="560" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${recipie.strYoutube.split("=")[1]}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    )}

                    {/* Save to Favorites Button */}
                    <button onClick={saveToFavorites} style={{
                        padding: "10px",
                        background: "orange",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        marginTop: "10px",
                        borderRadius: "5px"
                    }}>
                        Save to Favorites ⭐
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Recipie;
