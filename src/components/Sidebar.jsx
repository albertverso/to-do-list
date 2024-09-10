import React, { useState, useEffect, useRef } from 'react';
import { HiLogout } from 'react-icons/hi';
import { TfiAngleDoubleRight, TfiMenu } from 'react-icons/tfi';
import { Link, useNavigate } from 'react-router-dom';
import { logout, decodedFromToken } from '../services/authService';
import { getUser } from '../services/userService';
import blank from '../assets/fundo.png'


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const token = localStorage.getItem('token');
  const userId = decodedFromToken()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {

    const fetchUser = async () => {
      try {
          const userData = await getUser(userId, token);
          setUser(userData);
      } catch (error) {
          setError('Erro ao buscar tarefas');
      } finally {
          setLoading(false);
      }
    };

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
      fetchUser();
    };

  }, [isOpen, userId, token]);

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
          <section className='flex flex-row rounded-3xl h-24 bg-[#655a7c] px-2 py-4 gap-4'>
            <div className='relative w-16 bg-white rounded-full'>
                <img className="absolute inset-0 w-full h-full rounded-full object-cover" src={user?.profilePic ? user?.profilePic : blank} alt="" />
            </div>
            <div className='flex flex-col items-center justify-center gap-5'>
                <p>{user?.firstName ? user?.firstName : ''} {user?.lastName ? user?.lastName : ''}</p>
              <a onClick={() => {navigate("/Profile"), setIsOpen(!isOpen)}} className='underline cursor-pointer'>ver perfil</a>
            </div>
          </section>
          <div className="flex flex-col mt-6 ml-2 text-2xl">
            <Link to="/Home" onClick={toggleSidebar} className="py-2 hover:text-[#655a7c]">Home</Link>
            <Link to="/Criar-Tarefas" onClick={toggleSidebar} className="py-2 hover:text-[#655a7c]">Criar Tarefa</Link>
            <Link to="/Favoritos" onClick={toggleSidebar} className="py-2 hover:text-[#655a7c]">Favoritos</Link>
          </div>
          <div className='font-bold fixed ml-20 bottom-44'>
            <button onClick={() => handleLogout()}>
              < HiLogout className='hover:text-[#655a7c] mt-3' size={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
