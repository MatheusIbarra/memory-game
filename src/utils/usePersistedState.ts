import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>,
];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
    const [state, setState] = useState<T>(initialState);

    useEffect(() => {
        async () => {
            const storageValue = await AsyncStorage.getItem(key);

            if (storageValue) {
                setState(JSON.parse(storageValue));
            } else {
                setState(initialState);
            }
        }
    }, [])

    useEffect(() => {
        async () => {
            await AsyncStorage.setItem(key, JSON.stringify(state));
        }
    }, [key, state]);

    return [state, setState];
}

export default usePersistedState;
