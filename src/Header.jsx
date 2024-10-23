import { Link } from "react-router-dom";

<Link to="/recipes">Home</Link>

export function Header() {
  return (
    <header>
      <nav>
      <Link to="/">Home</Link> | <Link to="/recipes">recipes</Link> | <Link to="/signup">signup</Link> | <Link to="/login">login</Link>
      </nav>
    </header>
  )
}