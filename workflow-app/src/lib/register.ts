import axios from 'axios';
import { UserCreate } from '@/types/interfaces';

const API_URL = 'http://localhost:8000/user/';

export const registerUser = async (userData: UserCreate): Promise<void> => {
  try {
    const response = await axios.post("http://localhost:8000/auth/register", userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error registering user');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const checkEmailAvailability = async (email: string): Promise<boolean> => {
    const { data } = await axios.get(`${API_URL}check-availability`, { params: { email } });
    return data.available;
  };
  
  export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    const { data } = await axios.get(`${API_URL}check-availability`, { params: { username } });
    return data.available;
  };
  