import icon from '../assets/to-do-list.png'
import { SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si';

export default function Footer() {
    return (
        <footer className='mx-8 md:mx-32 mb-5 gap-5 mt-10 flex flex-col p-10 rounded-3xl bg-[#ab92bf]'>
            <div className='grid grid-cols-1 lg:grid-cols-3 justify-items-center font-semibold'>
                <div className='break-words p-5 flex flex-col items-center'>
                    <img src={icon} alt="" width={30} className='mx-auto' />
                    <p className="mt-2 text-center">
                        Todo List é uma ferramenta simples e eficaz para organizar suas tarefas diárias. Permite gerenciar atividades, acompanhar o progresso e manter o foco nas prioridades, ajudando você a ser mais produtivo a cada dia.
                    </p>
                </div>
                <div className='border-[#AFC1D6] border-r-2 border-l-2 px-40'>
                    <div class="flex flex-col font-semibold items-center justify-center mt-10 gap-3">
                        <a href="#home" class="hover:text-gray-400">Home</a>
                        <a href="#account" class="hover:text-[#AFC1D6]">Conta</a>
                        <a href="#tasks" class="hover:text-[#AFC1D6]">Tarefas</a>
                        <a href="#fav" class="hover:text-[#AFC1D6]">Favoritos</a>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-8'>
                    <SiLinkedin size={40} />
                    <SiGithub size={40} />
                    <SiInstagram size={40} />
                </div>
            </div>

            <div className='flex justify-center font-semibold'>
                <p class="mt-6">&copy; 2024 Todo List App. Criado por Albertverso.</p>
            </div>
        </footer>
    )
}