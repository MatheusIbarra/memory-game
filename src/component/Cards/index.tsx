import React from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Styled from './styles';

interface CardProps {
    number: string | number;
    suit: 'clubs' | 'hearts' | 'diamonds' | 'spades' ;
}

const Cards: React.FC<CardProps> = ({ number, suit }) => {
    const deviceWidth = useWindowDimensions().width;
    const deviceHeight = useWindowDimensions().height;

    return (
        <Styled.Container style={{width: deviceWidth / 5, height: deviceHeight / 6}}>
            <View style={{ justifyContent: 'center' }}>
                <Text>
                    {number}
                </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon 
                name={
                    suit === "clubs" ? 
                    "cards-club" : 
                    suit === "diamonds" ? 
                    "cards-diamond" : 
                    suit === "hearts" ? 
                    "cards-heart" : 
                    "cards-spade"
                    } 
                size={50} 
                color={
                    suit === "clubs" ? 
                    "black" : 
                    suit === "diamonds" ? 
                    "red" : 
                    suit === "hearts" ? 
                    "red" : 
                    "black"
                } 
            />
            </View>
            <Styled.BottomCard>
                {number}
            </Styled.BottomCard>
        </Styled.Container>
    ) ;
}

export default Cards;