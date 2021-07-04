import React, { useState, useEffect } from 'react';
import { Text, TextInput, Switch, View } from 'react-native';
import { useTheme } from "styled-components/native";
import { Picker } from '@react-native-community/picker';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../component/Button';
import { Container }  from '../../component/Input/styles';

import { cards } from '../../utils/cards';
import { useUser } from '../../hooks/user';
import { useGame } from '../../hooks/game';
import { Card, User } from '../../services/GameService';

import * as Styled from './styles';



const Landing: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [createUser, setCreateUser] = useState(new User());
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [haveUser, setHaveUser] = useState(false);

    const {
        user,
        update,
        setUpdate,
        selectUser,
    } = useUser();

    const {
        setCardsList,
        setRoundsCount,
    } = useGame();

    //FUNÇÃO RESPONSÁVEL PARA EMBARALHAR CARTAS
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
    
    //FUNÇÃO RESPONSÁVEL PARA SALVAR NOVO USUÁRIO/ESCOLHER USUÁRIO EXISTENTE
    const handleSave = async () => {
        //VERIFICA SE USUÁRIO É NOVO OU NÃO
        if(createUser.name) {
            let users: User[] = [];
            const data = await AsyncStorage.getItem('@MemoryGame:User');
            if(data && data.length > 0) {
                users = JSON.parse(data);
                users.push({...createUser, id: users.length + 1, ranking: [], createdAt: new Date().toString()});
                selectUser(-1, {...createUser, id: users.length, ranking: [], createdAt: new Date().toString()})
                await AsyncStorage.setItem('@MemoryGame:User', JSON.stringify(users));
            } else {
                users.push({...createUser, id: 1, ranking: [], createdAt: new Date().toString()});
                selectUser(-1, {...createUser, id: 1, ranking: [], createdAt: new Date().toString()});
                await AsyncStorage.setItem('@MemoryGame:User', JSON.stringify(users));
            }
        } else {
            selectUser(selectedIndex, new User());
        }
        //RESETA INPUTS, EMBARALHA CARTAS E REDIRECIONA PARA A HOME PAGE
        setCreateUser(new User());
        shuffle(cards);
        cards.forEach((e) => {
            e.show = false;
            e.finded = false;
        })
        setCardsList([...cards]);
        setRoundsCount(0);
        setUpdate(update + 1);
        navigation.navigate('Home');
    }

    //USEEFFECT RESPONSAVEL POR VERIFICAR SE POSSUI USUÁRIOS AO ENTRAR NA PAGINA
    useEffect(() => {
        if(user.length === 0) {
            setHaveUser(false);
        }
    }, []);

    return (
        <Styled.Container style={{flex: 1}}>
            <View></View>
            <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Olá, bem vindo!</Text>
                {user.length > 0 && 
                    <View style={{alignItems: 'center', flexDirection: 'row', marginBottom: 30}}>
                        <Text style={{marginRight: 10}}>Possui usuário ?</Text>
                        <Switch thumbColor={haveUser ? theme.primary : '#f4f3f4'} trackColor={{ false: '#767577', true: '#960000' }} value={haveUser} onValueChange={() => setHaveUser(!haveUser)}/>
                    </View>
                }

                {haveUser ?
                <Container             
                    isErrored={false}
                    isFocused={false}
                    applyShadow={false}
                >
                    <Picker
                        selectedValue={selectedIndex}
                        onValueChange={(e, index) => setSelectedIndex(index)}
                        style={{flex: 1}}
                    >
                        {user.map((item, index) => (
                            <Picker.Item key={index} label={item.name} value={index} />
                        ))}
                    </Picker>
                </Container>
                :
                    <Container             
                        isErrored={false}
                        isFocused={false}
                        applyShadow={false}
                    >
                        <TextInput 
                            style={{flex: 1}}
                            defaultValue={createUser.name || ''} 
                            placeholder={"Novo usuário"}
                            onChangeText={(e) => setCreateUser({...createUser, name: e})} 
                        />
                    </Container>
                }
            </View>

            <Button 
                background={theme.buttonPrimary} 
                onPress={() => handleSave()} 
                text="Entrar" >
            </Button>
        </Styled.Container>
    );
}

export default Landing;