import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Footer } from "./Footer";
import { RecipesPage } from "./RecipesPage";
import { RecipesShow } from "./RecipesShow";
import { RecipeBox } from "./RecipeBox";
import { PostsShow } from "./PostsShow";
import { ProfilePage } from "./ProfilePage";
import { UserShow } from "./UserShow";
import { RecipeBoxShow } from "./RecipeBoxShow";
import { ResultsPage } from "./ResultsPage";
import { isTokenValid } from "./auth";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && isTokenValid(jwt)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // Logout if the token is invalid or expired
      localStorage.removeItem("jwt"); // Optional: clear invalid token
    }
  }, []);

  // Pass isLoggedIn and setIsLoggedIn as props to Header and Login components
  const router = createBrowserRouter([
    {
      element: (
        <div className="min-h-screen flex flex-col">
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login setIsLoggedIn={setIsLoggedIn} /> },
        { path: "/results", element: <ResultsPage /> },
        { path: "/recipes", element: <RecipesPage /> },
        { path: "/recipes/:id", element: <RecipesShow /> },
        { path: "/recipe_box", element: <RecipeBox /> },
        { path: "/recipe_box/:id", element: <RecipeBoxShow /> },
        { path: "/posts/:id", element: <PostsShow /> },
        { path: "/users/:id", element: <UserShow /> },
        { path: "/profile", element: <ProfilePage setIsLoggedIn={setIsLoggedIn} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
