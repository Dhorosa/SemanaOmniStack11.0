import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity style={styles.datailsButton} onPress={navigation.goBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incidents}>
        <Text style={[styles.incidentsProperty, { marginTop: 0 }]}>CASO:</Text>
        <Text style={styles.incidentsValue}>{incident.title}</Text>

        <Text style={styles.incidentsProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentsValue}>{incident.description}</Text>

        <Text style={styles.incidentsProperty}>VALOR:</Text>
        <Text style={styles.incidentsValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Caso público</Text>
        <Text style={styles.heroDescription}>
          Nesta tela exibimos apenas dados do caso, sem informações do criador.
        </Text>
      </View>
    </View>
  );
}