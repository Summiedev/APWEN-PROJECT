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


  return (
    <>
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="h-8" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 poppins-medium">
          <a href="/" className="text-black hover:text-black">
            Home
          </a>
          <a href="/Projects" className="text-black hover:text-black">
            Projects
          </a>
          <a href="#BLOG" className="text-black hover:text-black">
            Blog
          </a>
          <a href="#FAQ" className="text-black hover:text-black">
            FAQ
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          
            <button
          
            className="bg-[#3C6DD8]  cursor-pointer  text-white px-4 py-2 rounded-4xl text-sm"
          >
            <a href="/projects">Get Started</a>
            
          </button>
      
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
          <a href="/" className="text-black hover:text-black">
            Home
          </a>
          <a href="/projects" className="text-black hover:text-black">
            Projects
          </a>
          <a href="#" className="text-black hover:text-black">
            Blog
          </a>
          <a href="#FAQ" className="text-black hover:text-black">
            FAQ
          </a>
        
        
            <button
          
              className="bg-[#3C6DD8]  cursor-pointer  text-white px-4 py-2 rounded-4xl text-sm"
            >
              <a href="/projects">Get Started</a>
              
            </button>
          
          
        </div>
      )}

    </header>

          </>
  );
}
