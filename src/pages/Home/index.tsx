import React, { useState } from 'react';
import { 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Linking, 
  Platform, 
  View, 
  useWindowDimensions, 
  Text  
} from 'react-native';
import { useTheme } from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo';

import Cards from '../../component/Cards';
import Button from '../../component/Button';
import ModalComponent from '../../component/Modal';
import Accordion from '../../component/Accordion';
import { useGame } from '../../hooks/game';
import { useUser } from '../../hooks/user';
import formatDate from '../../utils/formatDate';

import * as Styled from './styles';

const Home: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const deviceWidth = useWindowDimensions().width;
  const deviceHeight = useWindowDimensions().height;

  const {
    user,
    selectedUser,
    setUser,
  } = useUser();

  const {
    selectedCards,
    refreshCards,
    toggleCard,
    cardsList,
    roundsCount
  } = useGame();

  //DELETA TODOS OS USUÁRIOS
  const deleteUsers = async () => {
    setConfirmModalVisible(false);
    await AsyncStorage.clear();
    setUser([]);
    navigation.navigate('Landing');
  }

  //DELETA USUÁRIO SELECIONADO PERCORRENDO A LISTA DOS MESMOS.
  const deleteUser = (index?: number) => {
    setConfirmModalVisible(false);
    user.splice(index ? index : selectedIndex, 1);
    AsyncStorage.setItem('@MemoryGame:User', JSON.stringify(user));
    setUser([...user]);
  }

  //ABRE MODAL DE CONFIRMAÇÃO
  const toggleConfirmModal = (index: number) => {
    if(index < 0) {
      if(Platform.OS === "ios") {
        deleteUsers();
      } else {
        setDeleteAll(true);
        setConfirmModalVisible(true);
      }
    } else {
      if(Platform.OS === "ios") {
        deleteUser(index);
      } else {
        setConfirmModalVisible(true);
        setSelectedIndex(index);
        setDeleteAll(false);
      }
    }
  }

  return (
    <Styled.Container style={{width: deviceWidth, maxWidth: 600}}>
      <ModalComponent
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
      >
        <Styled.ModalContent style={{height: 150, justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>Você tem certeza? A ação é irreversivel.</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, width: '100%'}}>
            <Button 
              background={theme.buttonPrimary} 
              style={{width: "40%"}}
              text="Sim"
              onPress={() => deleteAll ? deleteUsers() : deleteUser()}
            ></Button>
            <Button 
              background={theme.buttonSecundary} 
              style={{width: "40%"}}
              text="Não"
              onPress={() => setConfirmModalVisible(false)}
            ></Button>
          </View>
        </Styled.ModalContent>
      </ModalComponent>

      <ModalComponent 
        visible={usersModalVisible}
        onClose={() => setUsersModalVisible(false)}
      >
        <Styled.ModalContent>
          <Styled.ModalHeader>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Usuários</Text>
          </Styled.ModalHeader>
          <Button 
            background={theme.buttonPrimary}
            style={{width: 150, height: 30, marginTop: 10, marginLeft: 'auto', marginRight: 10}}
            icon={'times'}
            iconLib={'FontAwesome'}
            text="Excluir usuários"
            onPress={() => toggleConfirmModal(-1)}
            textSize={14}
          />
          <FlatList
            style={{width: '100%'}}
            data={user}
            numColumns={1}
            key={0}
            extraData={user}
            keyExtractor={(e) => e?.id?.toString()}
            ListEmptyComponent={() => (
              <Text>Nenhum dado encontrado</Text>
            )}
            renderItem={({ item: user, index }) => {
            return(
              <Styled.RankingContainer style={{flexDirection: 'column', width: '100%'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Usuário: {user.name}</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Criado dia: {user.createdAt && formatDate(user.createdAt)}</Text>
                {user.id !== selectedUser.id && 
                  <Button 
                    background={theme.buttonPrimary}
                    style={{width: 30, height: 30, marginTop: 10, position: 'absolute', right: 10, bottom: 10}}
                    icon={'times'}
                    iconLib={'FontAwesome'}
                    onPress={() => toggleConfirmModal(index)}
                  />
                }
              </Styled.RankingContainer>
            )}}
          />
        </Styled.ModalContent>
      </ModalComponent>

      <ModalComponent 
        visible={historyModalVisible}
        onClose={() => setHistoryModalVisible(false)}
      >
        <Styled.ModalContent>
          <Styled.ModalHeader>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Histórico</Text>
          </Styled.ModalHeader>
          <FlatList
            data={user}
            numColumns={1}
            key={0}
            extraData={user}
            keyExtractor={(e) => e?.id?.toString()}
            ListEmptyComponent={() => (
              <Text>Nenhum dado encontrado</Text>
            )}
            renderItem={({ item: user }) => {
              return(
                <Accordion title={user.name}>
                  {user.ranking.length > 0 ? 
                      user?.ranking?.map((e, index) => {
                      return (
                        <Styled.RankingContainer key={index}>
                          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Rodadas: {e.rounds}</Text>
                          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Dia: {e.date && formatDate(e.date)}</Text>
                        </Styled.RankingContainer>
                      )
                  })
                :
                  <Text>Nenhum dado encontrado</Text>                         
                }
                </Accordion>
              )}}
            />
        </Styled.ModalContent>
      </ModalComponent>

      <ModalComponent 
        visible={optionsModalVisible}
        onClose={() => setOptionsModalVisible(false)}
      >
        <Styled.ModalContent style={{height: 200}}>
          <Styled.ModalHeader>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Opções</Text>
          </Styled.ModalHeader>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 40}}>
            <Button 
              background={theme.buttonPrimary} 
              style={{width: "40%"}}
              text="Trocar usuário"
              onPress={() => navigation.navigate('Landing')}
            ></Button>
            <Button 
              background={theme.buttonSecundary} 
              style={{width: "40%"}}
              text="Reportar bug"
              onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=5583996157720&text=Ol%C3%A1%2C%20encontrei%20um%20bug%20na%20sua%20aplica%C3%A7%C3%A3o.`)}
            ></Button>
          </View>
        </Styled.ModalContent>

      </ModalComponent>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        <Text>Tentativas:</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 5}}>{roundsCount}</Text>
      </View>
      <TouchableOpacity onPress={() => setOptionsModalVisible(true)}style={{position: 'absolute', right: '2%', top: '2%' }} >
        <Icon size={20} name="dots-three-vertical"></Icon>
      </TouchableOpacity>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
      <FlatList
        data={cardsList}
        numColumns={4}
        key={0}
        extraData={cardsList}
        keyExtractor={(e) => e.id.toString()}
        ListEmptyComponent={() => (
          <View style={{justifyContent: 'center', alignItems: 'center', height: deviceHeight - 120, maxHeight: 600}}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>Parabéns, você ganhou !</Text>
              <Text>Deseja jogar mais uma vez ?</Text>
            </View>
            <Button
              style={{width: '100%', height: 36}}
              background={theme.buttonPrimary} 
              onPress={() => refreshCards()} 
              text={"Reinciar Jogo"} >
            </Button>
          </View>
        )}
        renderItem={({ item: card }) => {
          return(
            card.show ?
              <TouchableOpacity>
                {!card.finded ? 
                  <Cards suit={card.suit} number={card.number}/>
                :
                  <Styled.CardContainer 
                    style=
                    {{width: deviceWidth / 5, height: deviceHeight / 6, borderWidth: 0 }} 
                  />
                }
              </TouchableOpacity>
            :
              <TouchableOpacity disabled={selectedCards.length === 2} onPress={() => toggleCard(card, true, card.id)}>
                <Styled.CardContainer 
                  style=
                  {{width: deviceWidth / 5, height: deviceHeight / 6 }} 
                >
                  <Image  style={{flex: 1}} source={{ uri: 'http://www.clubedotaro.com.br/site/galerias/imagens/jc0-dorso.jpg'}}/>
                </Styled.CardContainer>
              </TouchableOpacity>
          )}}
        />
        <Styled.BottomItems style={{width: deviceWidth - 10}}>
          <Button
            style={{width: '30%', height: 36}}
            background={theme.buttonPrimary} 
            onPress={() => refreshCards()} 
            text={cardsList.length < 20 ? "Reinciar Jogo" : "Novo Jogo"} >
          </Button>
          <Button
            style={{width: '30%', height: 36}}
            background={theme.buttonPrimary} 
            onPress={() => setHistoryModalVisible(true)} 
            text="Histórico">
          </Button>
          <Button
            style={{width: '30%', height: 36}}
            background={theme.buttonPrimary} 
            onPress={() => setUsersModalVisible(true)} 
            text="Usuários">
          </Button>
        </Styled.BottomItems>
      </View>
    </Styled.Container>
  )
 ;
}

export default Home;