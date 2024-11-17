import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react"; 

export function Header({ isLoggedIn }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Focus the input when opening the search
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-orange-100 text-center text-sm  fixed top-0 left-0 right-0 z-50">
      <nav className="w-full px-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
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

              {/* Search Icon with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleSearch}
                  className="hover:bg-orange-50 p-2 rounded-full flex items-center"
                  type="button"
                >
                  <Search size={24} className="text-gray-600" />
                </button>
                {isSearchOpen && (
                  <div
                    className="absolute top-12 left-1/2 transform -translate-x-1/2 w-60 bg-white shadow-md rounded-md p-4 z-50"
                  >
                    <form onSubmit={handleSearchSubmit}>
                      <div className="flex items-center">
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                          className="p-1 w-full border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-orange-300"
                          placeholder="Search recipes..."
                        />
                        <button
                          type="submit"
                          className="p-1 bg-black text-white rounded-md text-base hover:bg-gray-800 transition-colors"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

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

export default Header;