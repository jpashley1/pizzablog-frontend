import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Footer } from "./Footer";
import { RecipesPage } from "./RecipesPage";
import { RecipesShow } from "./RecipesShow";
import { PostsShow } from "./PostsShow";
import { ProfilePage } from "./ProfilePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if a JWT exists in localStorage on component mount
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
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
        { path: "/recipes", element: <RecipesPage /> },
        { path: "/recipes/:id", element: <RecipesShow /> },
        { path: "/posts/:id", element: <PostsShow /> },
        { path: "/profile", element: <ProfilePage setIsLoggedIn={setIsLoggedIn} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
