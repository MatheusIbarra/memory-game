import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Card, User } from '../services/GameService';
import { cards } from '../utils/cards';
import { useUser } from './user';

interface GameContextData {
    show: boolean;
    setShow(value: boolean): void;
    toggleCard(item: Card, value: boolean, index: number): void;
    cardsList: Card[];
    refreshCards(): void;
    selectedCards: Card[];
    roundsCount: number;
    setCardsList(cards: Card[]): void;
    setRoundsCount(number: number): void;
}

const gameContext = createContext<GameContextData>({} as GameContextData);

const GameProvider: React.FC = ({ children }) => {
    const [show, setShow] = useState(false);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [roundsCount, setRoundsCount] = useState(0);
    const [cardsList, setCardsList] = useState<Card[]>([]);

    const {
        selectedUser,
        update,
        setUpdate,
    } = useUser();

    //ADICIONA CARTA SELECIONADA EM ARRAY DE CARTAS SELECIONADAS.
    const toggleCard = (item: Card, value: boolean, id: number) => {
        const index = cardsList.findIndex(e => e.id === id);
        cardsList[index].show = value;
        setCardsList([...cardsList]);
        selectedCards.push(item);
        setSelectedCards([...selectedCards]);
    }
    
    //VERIFICA SE AS DUAS CARTAS DO ARRAY SÂO IGUAIS.
    const getCombination = () => {
        if(selectedCards[0].pairId === selectedCards[1].id) {
            selectedCards.forEach((e) => {
                const index = cardsList.findIndex(data => e.id === data.id);
                if(index !== -1) {
                    cardsList[index].finded = true;
                    setCardsList([...cardsList]);
                }
            });
        } else {
            selectedCards.forEach((e) => {
                const finded = cardsList.findIndex(data => e.id === data.id);
                if(finded !== -1) {
                    cardsList[finded].show = false;
                    setCardsList([...cardsList]);
                }
            });
        }
    }

    //REINICIA O JOGO
    function refreshCards() {
        shuffle(cards);
        cards.forEach((e) => {
            e.show = false;
            e.finded = false;
        })
        setCardsList([...cards]);
        setSelectedCards([]);
        setRoundsCount(0);
    }

    //EMBARALHA CARTAS
    function shuffle(array: Card[]) {
        var actuallyIndex = array.length, tempValue, randomIndex;
        while (0 !== actuallyIndex) {
            randomIndex = Math.floor(Math.random() * actuallyIndex);
            actuallyIndex -= 1;
     
            tempValue = array[actuallyIndex];
            array[actuallyIndex] = array[randomIndex];
            array[randomIndex] = tempValue;
        }
        return array;
    }

    //ADICIONA PONTUAçÃO AO RANKING!
    async function saveRanking () {
        const data = await AsyncStorage.getItem('@MemoryGame:User');
        if(data) {
            const parsedData: User[] = JSON.parse(data);
            const user = parsedData.findIndex(e => e.id === selectedUser.id);
            if(user !== -1) {
                parsedData[user].ranking.push({rounds: roundsCount + 1,  date: new Date().toString()});
                await AsyncStorage.removeItem('@MemoryGame:User');
                await AsyncStorage.setItem('@MemoryGame:User', JSON.stringify(parsedData));
                setUpdate(update + 1);
            }
       }
    }

    //PEGA COMBINAÇÂO DE CARTAS E DISPARA FUNCÃO
    useEffect(() => {
        if(selectedCards.length > 1 && selectedCards.length < 3) {
            setTimeout(() => {
                getCombination();
                setRoundsCount(roundsCount + 1);
                setSelectedCards([]);
            }, 500)
        }
    }, [selectedCards]);

    //DETECTA QUANDO O JOGO FINALIZA E DISPARA FUNÇÃO PARA ADICIONAR AO RANKING
    useEffect(() => {
        const filteredCards = cardsList.filter(e => e.finded === true);
        if(filteredCards.length > 0 && cardsList.length > 0) {
            if(filteredCards.length === cardsList.length) {
                setCardsList([]);
                saveRanking();
            }
        }
    }, [cardsList]);

    return (
        <gameContext.Provider value={{setCardsList, setRoundsCount ,roundsCount, show, setShow, toggleCard, cardsList, refreshCards, selectedCards }}>
            {children}
        </gameContext.Provider>
    )
};

function useGame(): GameContextData {
    const context = useContext(gameContext);

    if (!context) {
        throw new Error('useGame must be used within an GameProvider');
    }

    return context;
}

export { GameProvider, useGame };