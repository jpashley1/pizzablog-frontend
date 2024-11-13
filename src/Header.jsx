import { Link } from "react-router-dom";

export function Header({ isLoggedIn }) {
  return (
    <header className="bg-orange-100 text-center text-xl py-4">
      <nav className="flex justify-between max-w-5xl mx-auto px-4">
        <Link className="hover:bg-orange-50 px-4 rounded-lg" to="/">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img
              src="/public/home-icon2.png" // Replace with the correct path to your icon
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <Link className="transition-opacity hover:bg-orange-50 px-4 rounded-lg" to="recipes"><div className="w-9 h-9  overflow-hidden">
            <img
              src="/public/recipe book.png" // Replace with the correct path to your icon
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div></Link>
        
        {!isLoggedIn && (
          <Link className="hover:bg-orange-50 font-semibold mt-1 rounded-lg" to="/signup">Signup</Link>
        )}

        {isLoggedIn ? (
               <Link to="/profile" className="hover:bg-orange-50 px-4 rounded-lg">
                <div className="w-9 h-9 overflow-hidden">
                  <img
                    src="/public/pizza-icon2.png" // Replace with the correct path to your icon
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
        ) : (
          <Link className="hover:bg-orange-50 px-2 rounded-lg" to="/login">
            <button className="bg-black text-white rounded-md p-1">
              Login
            </button>
            </Link>
        )}
      </nav>
    </header>
  );
}
