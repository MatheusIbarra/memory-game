import React from 'react';
import { GameProvider } from './game';
import { ThemeProvider } from './theme';
import { UserProvider } from './user';

const AppProvider: React.FC = ({ children }) => (
    <ThemeProvider>
        <UserProvider>
            <GameProvider>
                { children } 
                
            </GameProvider>
        </UserProvider>
    </ThemeProvider>
);

export default AppProvider;
