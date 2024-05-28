import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID.js"
import axios from "axios";
import { useCookies } from "react-cookie";
import "./saved-recipe.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, setcookies] = useCookies("access_token");
  const userID = useGetUserID();

  const toastVariables = {
    position: "top-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mern-recipe-backend-six.vercel.app/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  const handleDelete = async (recipeID) => {
    const data = await axios.put(`https://mern-recipe-backend-six.vercel.app/recipes/remove/${userID}/${recipeID}`);
    console.log(data.data)
    setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeID));

    toast.success("Recipe Removed Successfully", toastVariables);

  }
  return (
    <div className="mainbox">
      {cookies.access_token ? <h1>Saved Recipes</h1> : <h1>Login first</h1>}
      <ul className="saveMain">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <span><button onClick={() => handleDelete(recipe._id)} className="Remove"> Remove </button></span>

            <p>{recipe.instructions}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </div>

          </li>

        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default SavedRecipes;