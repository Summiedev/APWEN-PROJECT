import { useState } from "react";
import { Menu, X, UserCircle } from "lucide-react"; 
import Laogo from "../assets/logo-light.png"; 

export default function Navbar({ isLoggedIn, setOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img src={Laogo} alt="Logo" className="h-8" />

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
              className="bg-[#3C6DD8] text-white px-4 py-2 rounded-4xl text-sm hidden md:block"
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
          {!isLoggedIn && (
            <button
              onClick={() => setOpen(true)}
              className="bg-[#3C6DD8] text-white px-4 py-2 rounded-4xl text-sm"
            >
              Get Started
            </button>
          )}
        </div>
      )}
    </header>
  );
}
