import { HiHeart, HiOutlineHeart, HiOutlinePencilAlt } from "react-icons/hi";
import CircularProgress from './CircularProgress';
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { updateTask } from "../services/taskService";

export default function Notes({favorite, description, title, createdAt, progress, id}) {
    const [fav, setFav] = useState(favorite)
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    const handleEditClick = (taskId) => {
        // Armazena o ID da tarefa no localStorage
        localStorage.setItem('taskId', taskId);
        // Redireciona para a página de edição
        navigate(`/Editar-Tarefas`); // Altere o caminho conforme sua rota
    };

    const handleFavoriteClick = async () => {
        setFav(!fav); // Alterna o estado local

        try {
            await updateTask(id, { favorite: !fav }, token); // Atualiza no backend
        } catch (error) {
            // Opcional: você pode reverter o estado local se a atualização falhar
            setFav(fav);
            throw error;
        }
    };

    useEffect(() => {
        const updateProgress = async () => {
            try {
                // Chama a função para atualizar o progresso no backend usando o taskId
                await updateTask(id, { progress }, token); 
            } catch (error) {
                throw error;
            }
        };

        // Chama a função ao renderizar o componente
        if (id) {
            updateProgress();
        }
    }, [id, progress]); // Executa quando taskId ou progress mudar

    return (
        <div className="flex flex-col rounded-2xl bg-[#ab92bf] w-full min-h-96 p-8 overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-600">
            <div className="flex flex-row items-center justify-between">
                <div className={`text-2xl font-semibold ${progress === 100 && 'line-through'}`}> {title} </div>
                <button className="outline-none hover:text-[#AFC1D6]" onClick={handleFavoriteClick}>
                    {
                        fav ? 
                        <HiHeart size={30} className=""/>
                        :
                        <HiOutlineHeart size={30} className=""/> 
                    }
                </button>
            </div>
            <div className={`text-xl px-2 mt-5 break-words ${progress === 100 && 'line-through'}`} >
                <p>
                    {description}
                </p>
            </div>
            <div className="flex flex-row mt-auto items-center justify-between ">
                <CircularProgress progress={progress} stroke={5} radius={25} />
                <div className="flex flex-col items-center">
                    <p className={`font-bold text-[#AFC1D6]`}> {progress <= 30 ? 'Novo!' : progress < 99 ? 'Em progresso!' : 'Finalizado!'}</p>
                    <p className="font-semibold"> {format(new Date(createdAt), 'dd MMM. yyyy')}</p>
                </div>
                <button className=" outline-none hover:text-[#AFC1D6]" onClick={() => handleEditClick(id)}>
                    <HiOutlinePencilAlt size={30}/>
                </button>
            </div>
        </div>
    )
}