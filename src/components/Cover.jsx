import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Verifique esta importação
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import cover1 from '../assets/login1.png'
import cover2 from '../assets/login2.png'
import cover3 from '../assets/login3.png'
import { ReactTyped } from 'react-typed';

export default function Cover() {
    return(
        <div className="flex flex-row bg-[#b8adcf] w-full h-full rounded-[40px] p-5 justify-center gap-20 overflow-hidden">
            <div className="flex flex-col items-center justify-center gap-10">
                <div>
                <   img src={cover2} alt="" width={300} />
                </div>
                <div className='w-full h-96 bg-[#f6e4eb] flex flex-col gap-8 rounded-lg shadow-lg items-start justify-center break-word font-handwriting text-xl p-5'>
                    <p className='text-2xl font-bold ' >ToDo List</p>
                <ReactTyped
                    strings={[
                        "- Estudar programação",
                        "- Revisão do dia",
                        "- Descanso",
                    ]}
                    typeSpeed={40}
                    backSpeed={150}
                    loop={true}
                />
                <ReactTyped
                    strings={[
                        "- Planejamento financeiro",
                        "- Networking",
                        "- Aprender algo novo",
                    ]}
                    typeSpeed={40}
                    backSpeed={150}
                    loop={true}
                />
                <ReactTyped
                    strings={[
                        "- Organizar trabalho",
                        "- Tarefas administrativas",
                        "- Atualizar projetos",
                    ]}
                    typeSpeed={40}
                    backSpeed={150}
                    loop={true}
                />
                <ReactTyped
                    strings={[
                        "- Reuniões e compromissos",
                        "- Tarefas recorrentes",
                        "- Ler por 30 minutos",
                    ]}
                    typeSpeed={40}
                    backSpeed={150}
                    loop={true}
                />
                <ReactTyped
                    strings={[
                        "- Exercícios físicos",
                        "- Responder e-mails",
                        "- Planejar a semana",
                    ]}
                    typeSpeed={40}
                    backSpeed={150}
                    loop={true}
                />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
                <a href={''}></a>
                <div className='w-full max-w-[300px] h-96 bg-[#f6e4eb] rounded-lg shadow-lg items-start break-word font-handwriting text-xl p-5 '>
                    <ReactTyped
                        className='text-xl 2xl:text-2xl break-words'
                        strings={[" Todo List é uma ferramenta simples e eficaz para organizar suas tarefas diárias. Permite gerenciar atividades, acompanhar o progresso e manter o foco nas prioridades, ajudando você a ser mais produtivo a cada dia. <br/> <strong> <a href='https://github.com/albertverso' target='_blank'> Desenvolvido por Albertverso <a/> </strong> "]}
                        typeSpeed={30}
                        backSpeed={40}
                        backDelay={5000}
                        loop={true}
                    />
                </div>
                <div>
                    <img src={cover3} alt="" width={300}/>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-16">
                <div className="">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar className="bg-[#dfc5d9] rounded-lg shadow-lg " />
                    </LocalizationProvider>
                </div>
                <div>
                    <img src={cover1} alt="" width={300}/>
                </div>
            </div>
        </div>
    )
}