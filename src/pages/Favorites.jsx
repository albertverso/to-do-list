import Notes from '../components/Notes';
import { getFavoriteTask } from '../services/taskService';
import SkeletonLoading from '../components/SkeletonLoading';
import { useEffect, useState } from 'react';
import { decodedFromToken } from '../services/authService';

export default function Favorites() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
   
    const token = localStorage.getItem('token');
    const userId = decodedFromToken()
   
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const taskData = await getFavoriteTask(userId, token);
                setTasks(taskData);
            } catch (error) {
                setErrorMessage('Nenhuma tarefa favoritada');
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
    if (errorMessage) return <div className='mt-5 text-[#655a7c] dark:text-white text-lg font-semibold text-center'>{errorMessage}</div>;

    return (
        <div>
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
            </section>
        </div>
    )
}