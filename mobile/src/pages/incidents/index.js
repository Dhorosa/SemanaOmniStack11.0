import React, { useState, useEffect } from 'react';
import {useNavigation } from '@react-navigation/native';
import {Feather } from '@expo/vector-icons';

import api from '../../services/api';
import {View , FlatList, Image , Text, TouchableOpacity} from 'react-native';


import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){
    const [incidents,setIncidents]= useState ([]);
    const [total,setTotal]= useState (0);
    const [page, setPage] = useState(1);
    const [loading, setLoading]= useState(false);

    const navegation = useNavigation();
    function Nada (){
        return;
    }
    function navegationToDetail(incident) {
        navegation.navigate ('Detail', {incident});
    }

    async function loadIncidents(){
        if (loading){
            return;
        }
        if (total > 0 && incidents.length == total){
            return;
        }
        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(()=> {loadIncidents();
    
    },[] );


    return (    
        <View style={styles.container} >

            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.

                </Text>

            </View> 
            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incidents => String(incidents.id)  }
                showsVerticalScrollIndicator={false} 
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incidents}) => (
                    <View style={ styles.incidents}>
                        <Text style={[styles.incidentsProperty, { marginTop: 0 }]}>ONG: </Text>
                        <Text style={styles.incidentsValue}> {incidents.name} </Text>

                        <Text style={styles.incidentsProperty}>CASO sempre Será: </Text>
                        <Text style={styles.incidentsValue}>{incidents.title} </Text>

                        <Text style={styles.incidentsProperty}>VALOR SERÁ: </Text>
                        <Text style={styles.incidentsValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL' 
                            } ).format(incidents.value)} 
                        </Text>

                        <TouchableOpacity 
                            style={styles.datailsButton}
                            onPress ={() =>  navegationToDetail (incidents)}
                        >
                            <Text style={styles.detailsButtonText} >Ver mais detalhes </Text> 
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>

                    </View>

                )}
            />
                   
        </View>
    );
}