import axios from "axios";

export default {
  // Gets all Recipes
  getFavorites: function() {
    return axios.get("/api/getFavorites");
  },

  // Deletes the Recipes with the given id
  removeFavoriteById: function(id) {
    return axios.delete("/api/removeFavorite",{data:{recipeID:id}});
  },
  
  // Saves a recipe to the database
  saveRecipe: function(recipe) {
    console.log("saving recipe")
    return axios.post("/api/saveRecipe",recipe);
  },

  // saveRecipe: function(recipeData) {
  //   return axios.post("/api/saveRecipe", recipeData);
  // },
  query: function() {
    console.log(`querying...`);
    return axios.get("/api/search");
  },
  login: function(email, password) {
    console.log(`attempting login...`);
    return axios.post("/api/login", { email: email, password: password });
  },
  logout: function() {
    console.log(`attempting logout...`);
    return axios.post("/api/logout");
  },
  signUp: function(user) {
    console.log(`registering user...${user.email}`);
    return axios.post("/api/signup", user);
  }
};
