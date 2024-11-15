import { Link } from "react-router-dom";

export function Header({ isLoggedIn }) {
  return (
    <header className="bg-orange-100 text-center text-xl py-2">
      <nav className="flex justify-center items-center max-w-5xl mx-auto">
        {/* Centered Icons and Buttons (when logged out) */}
        <div className="flex justify-center space-x-16 w-full">
          <Link className="hover:bg-orange-50 p-2 rounded-full flex items-center" to="/">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img
                src="/public/home-icon2.png"
                alt="Home"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link className="hover:bg-orange-50 p-2 rounded-full flex items-center" to="/recipes">
            <div className="w-9 h-9 border-2 border-black overflow-hidden">
              <img
                src="/public/recipemix.png"
                alt="Recipes"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          {isLoggedIn ? (
            <>
              <Link className="hover:bg-orange-50 p-2 rounded-full flex items-center" to="/recipe_box">
                <div className="w-9 h-9 overflow-hidden">
                  <img
                    src="/public/recipe book.png"
                    alt="Recipe Box"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <Link className="hover:bg-orange-50 p-2 rounded-full flex items-center" to="/profile">
                <div className="w-9 h-9 overflow-hidden">
                  <img
                    src="/public/pizza-icon2.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link className="hover:bg-orange-50 font-semibold p-1 rounded flex items-center" to="/signup">
                Signup
              </Link>
              <Link className="hover:bg-orange-50 p-2 rounded-lg flex items-center" to="/login">
                <button className="bg-black text-white rounded-md p-1">Login</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
