import { Link } from 'react-router-dom';
import icon from '../assets/to-do-list.png'
import { SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si';

export default function Footer() {
    return (
        <footer className='mx-8 md:mx-32 pb-5 gap-5 mt-10 flex flex-col p-10 rounded-3xl bg-[#ab92bf]'>
            <div className='gap-5 lg:gap-0  grid grid-cols-1 lg:grid-cols-3 justify-items-center font-semibold'>
                <div className='break-words p-5 flex flex-col items-center'>
                    <img src={icon} alt="" width={30} className='mx-auto' />
                    <p className="mt-2 text-center">
                        Todo List é uma ferramenta simples e eficaz para organizar suas tarefas diárias. Permite gerenciar atividades, acompanhar o progresso e manter o foco nas prioridades, ajudando você a ser mais produtivo a cada dia.
                    </p>
                </div>
                <div className='border-[#AFC1D6] border-t-2 border-b-2 lg:border-b-0 lg:border-t-0 lg:border-r-2 lg:border-l-2 pb-8 w-full md:px-20 xl:px-40'>
                    <div class="flex flex-col font-semibold items-center justify-center mt-10 gap-3">
                        <Link to={"/Home"} class="hover:text-gray-400">Home</Link>
                        <Link to={"/Profile"} class="hover:text-[#AFC1D6]">Perfil</Link>
                        <Link to={"/Criar-Tarefas"} class="hover:text-[#AFC1D6]">Criar tarefa</Link>
                        <Link to={"/Favoritos"} class="hover:text-[#AFC1D6]">Favoritos</Link>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-8'>
                    <a href='https://www.linkedin.com/in/albertverso/' target="_blank" rel="noopener noreferrer">
                        <SiLinkedin size={40} />
                    </a>
                    <a href='https://github.com/albertverso/' target="_blank" rel="noopener noreferrer">
                        <SiGithub size={40} />
                    </a>
                    <a href='https://www.instagram.com/albertverso/' target="_blank" rel="noopener noreferrer">
                        <SiInstagram size={40} />
                    </a>
                </div>
            </div>

            <div className='flex text-center justify-center font-semibold'>
                <p class="mt-6">&copy; 2024 Todo List App. Criado por Albertverso.</p>
            </div>
        </footer>
    )
}