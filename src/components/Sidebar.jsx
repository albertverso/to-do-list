import React, { useState, useEffect, useRef } from 'react';
import { HiLogout } from 'react-icons/hi';
import { TfiAngleDoubleRight, TfiMenu } from 'react-icons/tfi';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isTokenExpired } from '../services/authService';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {

    if (isTokenExpired()) {
      logout();
    }
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout()
    navigate("/Login");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Adiciona um efeito suave ao rolar
    });
  };

  return (
    <>
      {/* Botão para abrir/fechar a Sidebar */}
      <button
        onClick={() => {toggleSidebar(), scrollToTop()}}
        className="fixed top-10 left-10 z-50 outline-none"
      >
        {isOpen ? <TfiAngleDoubleRight className='hover:text-[#ab92bf]' size={24} /> : <TfiMenu className='hover:text-[#ab92bf]' size={24} />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-[104px] left-0 h-full bg-[#ab92bf] shadow-xl text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64 z-40`}
      >
        {/* Sidebar content */}
        <div className=" flex flex-col p-4">
          <h2 className="text-4xl font-bold">Menu</h2>
          <div className="flex flex-col mt-8 ml-2 text-2xl">
            <Link to="/Conta" onClick={toggleSidebar} className="py-2 hover:text-[#655a7c]">Conta</Link>
            <Link to="/Home" onClick={toggleSidebar} className="py-2 hover:text-[#655a7c]">Home</Link>
            <Link to="/Criar-Tarefas" onClick={toggleSidebar} className="py-2 hover:text-[#655a7c]">Criar Tarefa</Link>
            <Link to="/Favoritos" onClick={toggleSidebar} className="py-2 hover:text-[#655a7c]">Favoritos</Link>
          </div>
          <div>
            <button onClick={() => handleLogout()}>
              < HiLogout className='fixed ml-20 bottom-44 hover:text-[#655a7c]' size={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
