// src/pages/Home.jsx

import { useState } from 'react';
import React from 'react';
import Logo from '../assets/logo-light.png';
import First from '../assets/sustainability.png'
import Second from '../assets/engineering.png'
import Third from '../assets/analytics.png'
import Fourth from '../assets/instant.png'
import typing from '../assets/amico.png'
import nerd from '../assets/brod.png'
import bro from '../assets/bro.png'
import { CheckCircle,X } from 'lucide-react'
import FAQSection from '../components/FaQuestion';
import { FcGoogle } from "react-icons/fc"; 
import Navbar from '../components/NavBar';

const Home = () => {
    const [open, setOpen] = useState(false);
    const features = [
        {
          title: "Material suggestions you'll actually use",
          description: "Say goodbye to endless irrelevant options. Our AI-powered filters focus on what truly matters — strength, cost-efficiency, environmental suitability, and sustainability — delivering results tailored to your specific project needs.",
          points: [
            "Strength-focused filtering",
            "Cost-efficient material options",
            "Environmental suitability checks",
            "Sustainability prioritized",
          ],
          image: bro,
          alt: "Material Suggestions",
        },
        {
          title: "Track material specs, costs, and impact",
          description: "Access all material specifications — mechanical strength, durability ratings, environmental resistance — alongside real-time cost and sustainability scores. Manage every aspect of material selection from a single dashboard without the chaos of spreadsheets.",
          points: [
            "Mechanical strength ratings",
            "Durability and environmental resistance",
            "Real-time cost updates",
            "Sustainability scores included",
          ],
          image: typing,
          alt: "Track Specs",
        },
        {
          title: "Get AI-powered suggestions instantly",
          description: "Need answers fast? Our intelligent engine recommends the best-fit materials based on your project goals. Whether you’re designing a prototype or constructing infrastructure, you'll receive personalized, ranked suggestions within seconds.",
          points: [
            "Instant best-fit material suggestions",
            "Ranked options based on project goals",
            "Prototype and infrastructure ready",
            "Personalized recommendations",
          ],
          image: nerd,
          alt: "Instant Suggestions",
        },
      ];
  return (
    <div className="bg-white px-2  text-gray-900">
      {/* Navigation */}
      {/* <header className="flex justify-between items-center px-6 py-4 ">
      <img src={Logo} alt="Logo" className="h-8" />
        <nav className="space-x-6 poppins-medium hidden md:flex">
          <a href="/" className="text-black  hover:text-black">Home</a>
          <a href="/projects" className="text-black hover:text-black">Projects</a>
          <a href="#" className="text-black hover:text-black">Blog</a>
          <a href="#" className="text-black hover:text-black">FAQ</a>
        </nav>
        <div className="space-x-4">
         
          <button onClick={() => setOpen(true)} className="bg-[#3C6DD8]  cursor-pointer  text-white px-4 py-2 rounded-4xl text-sm">Get Started</button>
        </div>
      </header> */}
      <Navbar/>

      {/* Hero Section */}
      <section className="text-center jakarta-font py-20 px-6 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
        An AI-powered material selection <br/> tool for engineers and product <br/> designers
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
        Let AI help you pick the most suitable, cost-effective, and sustainable materials for your project—no stress, no guesswork
        </p>
        <button onClick={() => setOpen(true)}  className="bg-[#3C6DD8]  cursor-pointer  text-white px-6 py-3 rounded-4xl hover:bg-[#3C6DD8] text-lg">
          Get started
        </button>
      </section>

      
      <section className="bg-red-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who can use SmartMaterial?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          SmartMaterial is built for engineers, designers, and innovators at every level, designed to make material selection faster, smarter, and more reliable. Whether you're a student working on your first project or a professional managing large-scale builds, SmartMaterial offers intelligent recommendations tailored to your unique needs.


          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
       
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            
          <img src={Second} alt="Small Business" className="w-20 h-20 mr-4 mb-3" />
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Informed Decisions</h3>
            </div>
            <p className="text-gray-600 mb-6">
            Make fast, informed decisions on-site. SmartMaterial's instant recommendations help validate material choices under tight deadlines, ensuring durability and cost-efficiency for your builds.
            </p>
            <a href="/projects" className="font-semibold inline-flex items-center">
              Learn more
              <span className="ml-1">→</span>
            </a>
          </div>

          <div className="bg-white p-6 prounded-lg shadow hover:shadow-lg transition">
          <img src={First} alt="Small Business" className="w-20 h-20 mr-4 mb-3" />
            <div className="flex items-center mb-4">
             
              <h3 className="text-xl font-semibold text-gray-800">Smart Material Selection for Projects</h3>
            </div>
            <p className="text-gray-600 mb-6">
            Struggling with material options for projects or assignments? SmartMaterial helps you quickly find the right materials for bridges, structures, and infrastructure with just a few inputs — no trial and error needed.


            </p>
            <a href="/projects" className=" font-semibold inline-flex items-center">
              Learn more
              <span className="ml-1">→</span>
            </a>
          </div>

        
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <img src={Third} alt="Small Business" className="w-20 h-20 mr-4 mb-3" />
            <div className="flex items-center mb-4">
         
              <h3 className="text-xl font-semibold text-gray-800">Sustainable Material Options for Schools</h3>
            </div>
            <p className="text-gray-600 mb-6">
            Get eco-conscious material options that align with your cost
            limits without compromising performance.
            </p>
            <a href="/projects" className=" font-semibold inline-flex items-center">
              Learn more
              <span className="ml-1">→</span>
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <img src={Fourth} alt="Small Business" className="w-20 h-20 mr-4 mb-3" />
            <div className="flex items-center mb-6">
             
              <h3 className="text-xl font-semibold text-gray-800">Seamless Workflow Integration</h3>
            </div>
            <p className="text-gray-600 mb-4">
            From mechanical engineers to product designers, SmartMaterial
            fits into your workflow, no learning curve needed.
            </p>
            <a href="/projects" className=" font-semibold inline-flex items-center">
              Learn more
              <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white jakarta-font  py-16 px-6">
    <div className="space-y-16 p-8 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          {index % 2 === 0 ? (
            <>
            
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h1>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-4">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="text-green-600 mt-1" size={20} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            
              <div className="flex justify-center">
                <img src={feature.image} alt={feature.alt} className="w-72" />
              </div>
            </>
          ) : (
            <>
              {/* Image first */}
              <div className="flex justify-center">
                <img src={feature.image} alt={feature.alt} className="w-72" />
              </div>
              {/* Text second */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h1>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-4">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="text-green-600 mt-1" size={20} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
    </section>
    <FAQSection/>
      {/* Footer */}
      <footer className="bg-[#3C6DD8] py-6 text-center text-sm text-white">
        © 2025 SmartMaterials. All rights reserved
      </footer>
        {/* Modal */}
        
    </div>
  );
};

export default Home;
