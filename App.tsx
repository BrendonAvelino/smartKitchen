// HomeScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const alturaStatusBar = StatusBar.currentHeight;
const KEY_GPT = '';

interface HomeScreenProps {
  navigation: any; // Tipo do objeto de navegação
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [load, defLoad] = useState(false);
  const [receita, defReceita] = useState("");
  const [ingr1, defIngr1] = useState("");
  const [ingr2, defIngr2] = useState("");
  const [ingr3, defIngr3] = useState("");
  const [ingr4, defIngr4] = useState("");
  const [ocasiao, defOcasiao] = useState("");

  async function gerarReceita() {
    if (ingr1 === "" || ingr2 === "" || ingr3 === "" || ingr4 === "" || ocasiao === "") {
      alert("Informe todos os ingredientes!")
      return;
    }
    defReceita("");
    defLoad(true);
    Keyboard.dismiss();

    const prompt = `Sugira uma receita detalhada para o ${ocasiao} usando os ingredientes: ${ingr1}, ${ingr2}, ${ingr3} e ${ingr4} e pesquise a receita no YouTube. Caso encontre, informe o link.`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
        top_p: 1,
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Receita gerada:", data.choices[0].message.content);
        defReceita(data.choices[0].message.content)
      })
      .catch((error) => {
        console.error("Erro ao gerar receita:", error);
        Alert.alert("Erro", "Ocorreu um erro ao gerar a receita. Por favor, tente novamente mais tarde.");
      })
      .finally(() => {
        defLoad(false);
      })

    console.log("Função gerarReceita() chamada!");
  }

  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F6FF" />
      <Drawer.Navigator>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate('ColorMix')} style={styles.navbarItem}>
            <MaterialIcons name="color-lens" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SmartFashion')} style={styles.navbarItem}>
            <MaterialIcons name="style" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PcBuilder')} style={styles.navbarItem}>
            <MaterialIcons name="build" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Drawer.Navigator>
      <Text style={styles.header}>Cozinha fácil</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Insira abaixo os ingredientes</Text>
        <TextInput
          placeholder="Ingrediente 1"
          style={styles.input}
          value={ingr1}
          onChangeText={(texto) => defIngr1(texto)}
        />
        <TextInput
          placeholder="Ingrediente 2"
          style={styles.input}
          value={ingr2}
          onChangeText={(texto) => defIngr2(texto)}
        />
        <TextInput
          placeholder="Ingrediente 3"
          style={styles.input}
          value={ingr3}
          onChangeText={(texto) => defIngr3(texto)}
        />
        <TextInput
          placeholder="Ingrediente 4"
          style={styles.input}
          value={ingr4}
          onChangeText={(texto) => defIngr4(texto)}
        />
        <TextInput
          placeholder="Almoço ou jantar"
          style={styles.input}
          value={ocasiao}
          onChangeText={(texto) => defOcasiao(texto)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={gerarReceita}>
        <Text style={styles.buttonText}>Gerar receita</Text>
        <MaterialIcons name="travel-explore" size={24} color="#FFF" />
      </TouchableOpacity>
      <ScrollView style={styles.containerScroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }}>
        {load && (
          <View style={styles.content}>
            <Text style={styles.title}>Produzindo receita...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}
        {receita && (
          <View style={styles.content}>
            <Text style={styles.title}>Sua receita 👇</Text>
            <Text style={{ lineHeight: 24 }}>{receita}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  navbar: {
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FF5656',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  navbarItem: {
    marginBottom: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54,
    marginLeft: 60, // Adicionando margem para acomodar a barra de navegação
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
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '80%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  },
});

export default HomeScreen;
