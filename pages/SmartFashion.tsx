import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const alturaStatusBar = StatusBar.currentHeight;

const SmartFashion = () => {
  const [peca, setPeca] = useState("");
  const [ocasiao, setOcasiao] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F6FF" />
      <Text style={styles.header}>Dicas de Moda</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Qual peça de roupa você acha essencial para este look?</Text>
        <TextInput
          placeholder="Digite a peça de roupa"
          style={styles.input}
          value={peca}
          onChangeText={(text) => setPeca(text)}
        />
        <Text style={styles.label}>Para qual ocasião você usará esta roupa?</Text>
        <TextInput
          placeholder="Digite a ocasião"
          style={styles.input}
          value={ocasiao}
          onChangeText={(text) => setOcasiao(text)}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Obter sugestão de moda</Text>
        <MaterialIcons name="style" size={24} color="#FFF" />
      </TouchableOpacity>
      <ScrollView style={styles.containerScroll} showsVerticalScrollIndicator={false}>
        {/* Conteúdo de sugestões de moda aqui */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#94a3b8',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF5656',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
    marginBottom: 20,
  },
});

export default SmartFashion;
