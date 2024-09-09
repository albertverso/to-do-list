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