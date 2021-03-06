import React from 'react';
import * as MailComposer from 'expo-mail-composer';
import {View,Text, Image, TouchableOpacity, Linking} from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import {Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail( ){
    const navegation = useNavigation();
    const route = useRoute();

    const incidents = route.params.incident;
    const message = `Olá ${incidents.name}, estou entrando em contato pois gostaria de ajudar no caso "${incidents.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'} ).format(incidents.value)}. `


    function navegateBack() {
        navegation.goBack ();
    }
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incidents.title}`,
            recipients:[incidents.email],
            body : message ,
        })

    }
    function sendWhatsapp(){
      Linking.openURL(`whatsapp://send?phone=${incidents.whatsapp}&text=${message}`);  
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity 
                   style={styles.datailsButton}
                   onPress ={ navegation.goBack }
                >
                   <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>
            <View style={ styles.incidents}>
                <Text style={[styles.incidentsProperty, { marginTop: 0 }] }>ONG: </Text>
                <Text style={styles.incidentsValue}> {incidents.name} de {incidents.city} / {incidents.uf} </Text>

                <Text style={styles.incidentsProperty}>CASO: </Text>
                <Text style={styles.incidentsValue}>{incidents.title} </Text>

                <Text style={styles.incidentsProperty}>VALOR: </Text>
                <Text style={styles.incidentsValue}>{Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL' 
                      } ).format(incidents.value)} 
                </Text>
               
            </View> 
            <View style={ styles.contactBox}>
               <Text style={styles.heroTitle}>Salve o Dia!</Text>
               <Text style={styles.heroTitle}>Seja o Herói desse caso!</Text>

               <Text style={styles.heroDescription}>Entre em contato:</Text>
               <View style={ styles.actions}>
                 <TouchableOpacity 
                   style={styles.action}
                   onPress ={sendWhatsapp }
                 >
                   <Text style={styles.actionText}>WhatsApp</Text>
                 </TouchableOpacity>

                 <TouchableOpacity 
                   style={styles.action}
                   onPress ={ sendMail }
                 >
                   <Text style={styles.actionText}>E-mail</Text>
                 </TouchableOpacity>

               </View>
            </View>
        </View>     
    );
}