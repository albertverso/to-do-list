import { useState, useEffect } from "react";
import { IoAddCircle, IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { getTask, updateTask, deleteTaskItem } from "../services/taskService"; // Adicione a função de busca e atualização
import { BsArrowClockwise } from "react-icons/bs";
import { decodedFromToken } from './../services/authService';


export default function EditTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [itemTasks, setItemTasks] = useState([{ title: '', status: false }]); // Inicia com um itemTask vazio
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = decodedFromToken();
    const taskId = localStorage.getItem('taskId'); // Recupera o ID do localStorage

    // Função para carregar os dados da tarefa ao iniciar a página
    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                setLoading(true);
                const taskData = await getTask(taskId, token); // Faz o GET na tarefa específica
                setTitle(taskData.title);
                setDescription(taskData.description);
                setItemTasks(taskData.TaskItems); // Assumindo que `taskItems` é um array de objetos com a propriedade 'title'
                console.log(taskData.TaskItems)
            } catch (error) {
                setErrorMessage("Erro ao carregar dados da tarefa");
            } finally {
                setLoading(false);
            }
        };


        fetchTaskData();
    }, [taskId, token]); // Executa a requisição quando o componente é montado

    const handleAddItemTask = () => {
        if (!Array.isArray(itemTasks)) {
            setItemTasks([{ title: '' }]);  // Garante que seja um array
        } else {
            setItemTasks([...itemTasks, { title: '' }]);
        }
    };

    const handleInputChange = (index, e) => {
        const newItemTasks = [...itemTasks];
        newItemTasks[index].title = e.target.value; // Atualizando a propriedade title
        setItemTasks(newItemTasks);
    };

    const handleRemoveItemTask = async (index, itemId) => {
        if (itemId) {
            // Se há itemId, então faça a requisição DELETE
            try {
                console.log('Tentando remover item:', itemId);
                await deleteTaskItem(taskId, itemId, token);
            } catch (error) {
                setErrorMessage('Erro ao remover item da tarefa');
                console.error('Erro ao remover item:', error);
            }
        }
        
        // Remover o item da lista visualmente
        const newItemTasks = itemTasks.filter((_, i) => i !== index);
        setItemTasks(newItemTasks);
    };

    // Função para salvar a tarefa atualizada
    const handleUpdateTask = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedTask = {
            title: title,
            description: description,
            userId: userId,
            taskItems: itemTasks   // Array de objetos com title
        };

        try {
            await updateTask(taskId, updatedTask, token); // Faz a requisição PUT para atualizar a tarefa
            navigate("/Home"); // Redireciona para a Home após salvar
        } catch (error) {
            setErrorMessage("Erro ao atualizar a tarefa");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (index, checked) => {
        const updatedItemTasks = [...itemTasks]; // Faz uma cópia do estado atual
        updatedItemTasks[index] = {
            ...updatedItemTasks[index],
            status: checked, // Atualiza o status do item
        };
        setItemTasks(updatedItemTasks); // Atualiza o estado
    };

    return (
        <form onSubmit={handleUpdateTask} className="flex flex-col px-8 md:px-32 gap-5 mt-10 w-full">
            <div className='flex flex-col gap-4 mb-10'>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold'>Título *</label>
                    <input
                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md w-full'
                        type="text"
                        placeholder="Nome"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={20}
                        required
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold'>Descrição *</label>
                    <textarea
                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md w-full'
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={220}
                        required
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold'>Itens da tarefa *</label>
                    {itemTasks.map((itemTask, index) => (
                        <div key={itemTask.id || index} className="flex flex-row">
                            <input
                                type="checkbox"
                                checked={itemTask.status || false} // Valor inicial como false se não definido
                                onChange={(e) => { handleCheckboxChange(index, e.target.checked)}} // Passa o index e o novo valor
                                className="mr-2" // Margem à direita
                            />
                            <input
                                className={`focus:outline-[#ab92bf] w-full text-black bg-slate-200 p-2 rounded-md ${itemTask.status ? 'line-through' : ''}`}
                                type="text"
                                placeholder="Item da tarefa"
                                value={itemTask.title}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => {handleRemoveItemTask(index, itemTask.id)
                                    console.log('Remover item de tarefa:', itemTask.id); // Adicionando um log
                                } }  // Passando o itemId aqui
                                className="ml-2 text-red-500"
                            >
                                <IoCloseSharp size={20} />
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleAddItemTask}
                            className="text-[#ab92bf] outline-none hover:text-[#655a7c] p-2 mb-4"
                        >
                            <IoAddCircle size={30} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    type='submit'
                    disabled={loading}
                    className={`w-full md:max-w-[200px] flex items-center justify-center mt-5 bg-[#ab92bf] rounded-md p-2 font-bold text-white hover:bg-[#655a7c] ${loading && 'cursor-not-allowed bg-[#655a7c]'}`}
                >
                    {loading ? (
                        <span className="flex items-center text-light justify-center">
                            <div className="animate-spin text-light mr-3">
                                <BsArrowClockwise />
                            </div>
                            Carregando...
                        </span>
                    ) : (
                        'Salvar Tarefa'
                    )}
                </button>
            </div>
            {errorMessage && <p className='mt-5 text-[#ab92bf] text-lg text-center animate-pulse'>{errorMessage}</p>}
        </form>
    );
}
