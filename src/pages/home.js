import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();

  const toastVariables = {
    position: "top-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://mern-recipe-backend-six.vercel.app/recipes");
        console.log(response.data)
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mern-recipe-backend-six.vercel.app/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();

    if (cookies.access_token) fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://mern-recipe-backend-six.vercel.app/recipes", {
        recipeID,
        userID,
      },
        { headers: { authorization: cookies.access_token } });
      setSavedRecipes(response.data.savedRecipes);

      toast.success("Recipe Saved Successfully", toastVariables);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  return (
    <div className="centre">
      <h1>Explore New Recipes</h1>
      <ul className="cardMain">
        {recipes?.map((recipe) => (
          <div className="card">
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <h5>Cooking Time: {recipe.cookingTime} minutes</h5>
            </li>
          </div>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Home;
