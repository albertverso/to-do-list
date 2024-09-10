import apiUrl from "./apiService";

export const createAccount = async (userData) => {
    const response = await fetch(apiUrl+'/v1/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (response.status === 201) {
        return await response.json();
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar usuário');
    }
};

export const getUser = async (userId, token) => {
    try {
        const response = await fetch(`${apiUrl}/v1/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar o token no header
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar usuário');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const updateUser = async (userId, data, token) => {
    try {
        const response = await fetch(`${apiUrl}/v1/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar o token no header
            },
            body: data,
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }

        return await response.json(); // Retorna a resposta em JSON
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};