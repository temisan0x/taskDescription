import axios from 'axios'

const BASE_URL = 'https://stage.api.sloovi.com/'


// Login user
const login = async (userData) => {
    const response = await axios.post(BASE_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    login,
}

export default authService