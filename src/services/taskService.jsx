import apiUrl from "./apiService";

export const getTask = async (taskId, token) => {
    try {
        const response = await fetch(`${apiUrl}/v1/task/${taskId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar o token no header
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar tarefa');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const getAllTask = async (userId, token) => {
    try {
        const response = await fetch(`${apiUrl}/v1/task/all/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar o token no header
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar as tarefas');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const getFavoriteTask = async (userId, token) => {
    try {
        const response = await fetch(`${apiUrl}/v1/task/favorite/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar o token no header
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar tarefa');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const updateTask = async (taskId, data, token) => {
    try {
        const response = await fetch(`${apiUrl}/v1/task/${taskId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar o token no header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro ao editar a tarefa');
        }

        return await response.json(); // Retorna a resposta em JSON
    } catch (error) {
        throw new Error(error.message); // Lança o erro para o componente lidar
    }
};

export const createTask = async (data, token) => {
    try {
        const response = await fetch(`${apiUrl}/v1/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro ao criar a tarefa');
        }

        return await response.json(); // Retorna a resposta em JSON
    } catch (error) {
        throw new Error(error.message); // Lança o erro para o componente lidar
    }
};

export const deleteTaskItem = async (taskId, itemId, token) => {
    try {
        const response = await fetch(`${apiUrl}/v1/tasks/${taskId}/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar item da tarefa');
        }

        return await response.json(); // Se precisar de algum dado de resposta
    } catch (error) {
        console.error('Erro ao deletar item da tarefa:', error);
        throw error;
    }
};

export const deleteTask = async (taskId, token) => {
    try {
        const response = await fetch(`${apiUrl}/v1/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar tarefa');
        }

        return await response.json(); // Se precisar de algum dado de resposta
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        throw error;
    }
};
 