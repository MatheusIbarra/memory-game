import React, { useState } from 'react';
import { useRef } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Styled from './styles';

interface AccordionProps {
    title: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);
    const accordion = useRef(null);

    const toggleAccordion = () => {
        setExpanded(!expanded)
    }

    return (
        <View style={{marginTop: 20}}>
            <Styled.Accordion ref={accordion} onPress={()=> toggleAccordion()}>
                <Text 
                    style={{ 
                    fontSize: 14,
                    fontWeight:'bold',
                    color: 'black'
                    }}
                >   
                    {title}
                </Text>
                <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30}/>
            </Styled.Accordion>
            {
                expanded &&
                <View 
                    style={{
                        padding:16,
                    }}
                >
                    {children}
                </View>
            }
        </View>
    )
}

export default Accordion;