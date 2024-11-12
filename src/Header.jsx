import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-orange-100 text-center py-4">
      <nav className="flex justify-between max-w-5xl mx-auto px-4">
        <Link className="hover:bg-orange-50 px-4 rounded-lg" to="/">Home
        </Link>
        <Link className="transition-opacity hover:bg-orange-50 px-4 rounded-lg"to="recipes">Recipes
        </Link>
        <Link className="hover:bg-orange-50 px-4 rounded-lg" to="/signup">Signup
        </Link>
        <Link className="hover:bg-orange-50 px-4 rounded-lg" to="/login">Login</Link>
      </nav>
    </header>
  );
}
