import { HiOutlinePlusSm } from 'react-icons/hi';
import Notes from '../components/Notes';
import { getAllTask } from '../services/taskService';
import SkeletonLoading from '../components/SkeletonLoading';
import { useEffect, useState } from 'react';
import { decodedFromToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
   
    const token = localStorage.getItem('token');
    const userId = decodedFromToken()

    const handleClick = () => {
        navigate("/Criar-Tarefas")
    }
   
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const taskData = await getAllTask(userId, token);
                setTasks(taskData);
            } catch (error) {
                setErrorMessage('Adicione Tarefas!');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId, token]);
   
    // Função para calcular a porcentagem de itens concluídos
    const calculateCompletionPercentage = (taskId) => {
        const task = tasks.find(task => task.id === taskId);
    
        if (!task || !task.TaskItems) {
            return 0; // Retorna 0% se não encontrar a tarefa ou não houver itens
        }
    
        const totalItems = task.TaskItems.length;
        const completedItems = task.TaskItems.filter(item => item.status === true).length;
    
        if (totalItems === 0) {
            return 0; // Evita divisão por zero
        }
    
        // Calcula a porcentagem
        const completionPercentage = (completedItems / totalItems) * 100;
        // Arredonda para a casa dos 10 mais próximos
        const roundedPercentage = Math.round(completionPercentage / 10) * 10;

        return roundedPercentage;
    };
    

    if (loading) return SkeletonLoading()
   

    return (
        <div>
            { errorMessage && <div className='mt-5 text-[#655a7c] text-lg font-semibold text-center'>{errorMessage}</div>}
            <section className='px-8 md:px-32 gap-5 mt-10 justify-items-center grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mb-10'>
            {tasks.map(task => {
                    const percentage = calculateCompletionPercentage(task.id); // Calculando a porcentagem para cada task
                    return (
                        <Notes 
                            key={task.id} // Adicionando uma chave única para cada item
                            title={task.title} 
                            description={task.description} 
                            createdAt={task.createdAt} 
                            progress={percentage} // Passando a porcentagem como progresso
                            favorite={task.favorite} 
                            id={task.id} // Passando o ID da tarefa
                        />
                    );
                })}
                <button onClick={handleClick} className='w-full min-h-96 outline-none bg-[#AFC1D6] flex items-center justify-center rounded-xl hover:shadow-2xl hover:scale-105 transition-transform duration-600'>
                    <HiOutlinePlusSm size={40} />
                </button>
            </section>
        </div>
    )
}