import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Footer } from "./Footer";
import { RecipesPage } from "./RecipesPage";
import { RecipesShow } from "./RecipesShow";

const router = createBrowserRouter([
  {
    element: (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/recipes", element: <RecipesPage /> },
      { path: "/recipes/:id", element: <RecipesShow />}, 
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
