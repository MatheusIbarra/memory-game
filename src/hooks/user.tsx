import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../services/GameService';

interface UserContextData {
    user: User[];
    setUser(user: User[]): void;
    selectedUser: User;
    selectUser(index: number, user: User): void;
    update: number;
    setUpdate(value: number): void;
    setSelectedUser(user: User): void;
}

const userContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC = ({ children }) => {
    const [ user, setUser ] = useState<User[]>([]);
    const [ selectedUser, setSelectedUser ] = useState(new User());
    const [ update, setUpdate ] = useState(0);
    
    //PEGA TODOS OS USUÁRIOS NO STORAGE
    const getUser = async () => {
        const userStorage =  await AsyncStorage.getItem('@MemoryGame:User');
        if (userStorage) {
            const parsedUser = JSON.parse(userStorage);
            setUser(parsedUser);
            console.log(parsedUser);
        } else {
            setUser([]);
        }
    }
    //SELECIONA USUÁRIO NO STORAGE
    const selectUser = (index: number, createdUser: User) => {
        if(index >= 0) {
            setSelectedUser(user[index]);
        } else {
            setSelectedUser(createdUser);
            console.log(createdUser);
        }
    }

    useEffect(() => {
        getUser();
    }, [update])

    useEffect(() => {
        getUser();
    }, [])

    
    return (
        <userContext.Provider value={{ selectUser, selectedUser, user, setUser, update, setUpdate, setSelectedUser }}>
            {children}
        </userContext.Provider>
    )
};

function useUser(): UserContextData {
    const context = useContext(userContext);

    if (!context) {
        throw new Error('useUser must be used within an UserProvider');
    }

    return context;
}

export { UserProvider, useUser };