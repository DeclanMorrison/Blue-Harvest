import axios from "axios";

export default {
  // Gets all Recipes
  getRecipes: function() {
    return axios.get("/api/recipes");
  },
  // Gets the Recipes with the given id
  getRecipe: function(id) {
    return axios.get("/api/recipe/" + id);
  },
  // Deletes the Recipes with the given id
  deleteRecipe: function(id) {
    return axios.delete("/api/recipe/" + id);
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
    return axios.get("/api/logout");
  },
  signUp: function(user) {
    console.log(`registering user...${user.email}`);
    return axios.post("/api/signup", user);
  },
  checkAuth: function(user) {
    console.log(`checking auth on ${user.email}`);
    return axios.get("/api/checkAuth", user);
  }
};
