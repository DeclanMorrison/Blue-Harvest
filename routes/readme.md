# This folder is for API routes. Database calling will probably happen here, so import the required files from the controllers folder.

All routes in this folder will be handled with express.

As an example, a route could be /api/user/favorites, which would call UserController.getFavorites, which would query the database for the user's favorites.

The index.js file that is not inside the api folder is only for sending the react app to the front end if an api route is not type directly into the search bar, so if needed you can see the return of a certain api route inside the browser. This should probably be removed before deploying the production build.