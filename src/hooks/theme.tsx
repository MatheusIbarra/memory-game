import React, { createContext, useCallback, useContext } from 'react';
import { ThemeProvider as Provider, DefaultTheme } from 'styled-components/native';
import defaultTheme from '../styles/themes/default';
import usePersistedState from '../utils/usePersistedState'

interface ThemeContextData {
    changeTheme(theme: string): void;
    resetTheme(): void;
}

const themeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', defaultTheme);

    //HOOK PARA SELECIONAR TEMAS, POSSIVEL ATUALIZAÇÃO NO FUTURO PARA O TEMA DARK

    const changeTheme = useCallback((newtheme: 'dark' | 'light') => {
        if (newtheme === 'dark' && theme.name !== 'dark') {
            setTheme(defaultTheme);
        }
        setTheme(theme);
    }, []);

      const resetTheme = useCallback(() => {
        setTheme(defaultTheme);
    }, []);

    return (
        <themeContext.Provider value={{ changeTheme, resetTheme }}>
            <Provider theme={theme}>
                {children}
            </Provider>
        </themeContext.Provider>
    )
};

function useTheme(): ThemeContextData {
    const context = useContext(themeContext);

    if (!context) {
        throw new Error('useTheme must be used within an ThemeProvider');
    }

    return context;
}

export { ThemeProvider, useTheme };
