import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const alturaStatusBar = StatusBar.currentHeight;
const KEY_GPT = '';

// Componente Navbar
const Navbar = () => {
  return (
    <TouchableOpacity style={styles.navbar}>
      <Text style={styles.navbarText}>Pc Builder</Text>
    </TouchableOpacity>
  );
};

// ColorMixScreen Component
const ColorMixScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ColorMix Screen</Text>
    </View>
  );
};

export default function ColorMix() {
  const [mostrarOverlay, setMostrarOverlay] = useState(false);
  const [load, defLoad] = useState(false);
  const [cor1, defCor1] = useState("");
  const [cor2, defCor2] = useState("");
  const [corResultante, defCorResultante] = useState("");

  async function gerarCor() {
    if (cor1 === "" || cor2 === "") {
      alert("Informe ambas as cores!");
      return;
    }

    defLoad(true);
    Keyboard.dismiss();

    const prompt = `Dado que misturei as cores ${cor1} e ${cor2}, qual a cor resultante?`;

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
      console.log("Cor resultante:", data.choices[0].message.content);
      defCorResultante(data.choices[0].message.content);
    })
    .catch((error) => {
      console.error("Erro ao gerar cor:", error);
      Alert.alert("Erro", "Ocorreu um erro ao gerar a cor. Por favor, tente novamente mais tarde.");
    })
    .finally(() => {
      defLoad(false);
    })

    console.log("Função gerarCor() chamada!");
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <TouchableOpacity style={styles.overlayTrigger} onPress={() => setMostrarOverlay(!mostrarOverlay)}>
        <Text style={styles.overlayTriggerText}>{mostrarOverlay ? "Fechar Overlay" : "Abrir Overlay"}</Text>
      </TouchableOpacity>
      {mostrarOverlay && (
        <View style={styles.overlay}>
          <TouchableOpacity>
            <Text style={styles.overlayContent}> Pc Builder </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.overlayContent}> ColorMix </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.overlayContent}> Moda Inteligente </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F6FF" />
      <Text style={styles.header}>ColorMix</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Insira abaixo as cores</Text>
        <TextInput
          placeholder="Cor 1"
          style={styles.input}
          value={cor1}
          onChangeText={(texto) => defCor1(texto)}
        />
        <TextInput
          placeholder="Cor 2"
          style={styles.input}
          value={cor2}
          onChangeText={(texto) => defCor2(texto)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={gerarCor}>
        <Text style={styles.buttonText}>Gerar cor resultante</Text>
        <MaterialIcons name="color-lens" size={24} color="#FFF" />
      </TouchableOpacity>
      <ScrollView style={styles.containerScroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }}>
        {load && (
          <View style={styles.content}>
            <Text style={styles.title}>Calculando cor resultante...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}
        {corResultante && (
          <View style={styles.content}>
            <Text style={styles.title}>Cor resultante 👇</Text>
            <Text style={{ lineHeight: 24 }}>{corResultante}</Text>
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
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '25%',
    height: '100%',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  overlayTrigger: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#FF5656',
    borderRadius: 5,
    zIndex: 3,
  },
  overlayTriggerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlayContent: {
    padding: 25,
    marginTop: 25,
    borderRadius: 25,
    width: 300,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navbar: {
    padding: 10,
    backgroundColor: '#FF5656',
    borderRadius: 5,
  },
  navbarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
