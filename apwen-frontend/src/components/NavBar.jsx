import { useState,useEffect } from "react";
import { Menu, X, UserCircle } from "lucide-react"; 
import Logo from "../assets/logo-light.png"; 
import { FcGoogle } from "react-icons/fc"; 
export default function Navbar({ }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
   useEffect(() => {
      fetch("http://127.0.0.1:5000/api/user", {
        method: "GET",
        credentials: "include", // VERY IMPORTANT! Sends cookies to Flask
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Not logged in");
        })
        .then((data) => {
          setIsLoggedIn(true);
          setUserData(data);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setUserData(null);
        });
    }, []);
    const handleGoogleLogin = () => {
        window.location.href = "http://127.0.0.1:5000/api/login"; // Redirect to Flask Google login
      };
    
      const handleLogout = () => {
        fetch("http://127.0.0.1:5000/api/logout", {
          method: "POST",
          credentials: "include",
        })
          .then(() => {
            setIsLoggedIn(false);
            setUserData(null);
          })
          .catch((err) => console.error("Logout failed", err));
      };
    

  return (
    <>
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="h-8" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 poppins-medium">
          <a href="#" className="text-black hover:text-black">
            Home
          </a>
          <a href="#" className="text-black hover:text-black">
            Projects
          </a>
          <a href="#" className="text-black hover:text-black">
            Blog
          </a>
          <a href="#" className="text-black hover:text-black">
            FAQ
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <UserCircle className="w-8 h-8 text-gray-700" />
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="bg-[#3C6DD8] text-white px-4 cursor-pointer py-2 rounded-4xl text-sm hidden md:block"
            >
              Get Started
            </button>
          )}

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-black focus:outline-none"
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col md:hidden mt-4 space-y-4 poppins-medium">
          <a href="#" className="text-black hover:text-black">
            Home
          </a>
          <a href="#" className="text-black hover:text-black">
            Projects
          </a>
          <a href="#" className="text-black hover:text-black">
            Blog
          </a>
          <a href="#" className="text-black hover:text-black">
            FAQ
          </a>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <UserCircle className="text-blue-600" size={32} />
              <div className="text-sm">
                <p className="font-semibold">{userData?.name}</p>
                <p className="text-gray-500">{userData?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
           onClick={() => setOpen(true)}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
            >
              Get Started
            </button>
          )}
          
        </div>
      )}

    </header>
     {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="relative bg-white rounded-2xl w-full max-w-md mx-auto p-8">
             
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
    
                
                <div className="flex flex-col items-center space-y-4">
                  <img src={Logo} className="w-50 h-20" />
                  <h2 className="text-2xl font-bold text-blue-800">SmartMaterial</h2>
                  <p className="text-gray-600 text-center">
                    Use your Google account to get started quickly
                  </p>
    
                  {/* Google Button */}
                  <button button onClick={() => window.location.href = "http://localhost:5000/api/login"} className="flex items-center cursor-pointer justify-center w-full mt-6 border rounded-lg py-3 px-4 hover:bg-gray-50 transition gap-2">
                    <FcGoogle size={22} />
                    <span className="text-gray-700 font-medium">
                      Continue with Google
                    </span>
                  </button>
    
                  {/* Use as Guest */}
                  <p className="text-sm text-gray-600 mt-6">
                    <span className="text-gray-700 font-semibold cursor-pointer hover:underline">
                      Use as a Guest
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          </>
  );
}
