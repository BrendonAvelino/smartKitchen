import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Keyboard } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const PcBuilder = () => {

  const [mostrarOverlay, setMostrarOverlay] = useState(false);

  const [generation, setGeneration] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [usage, setUsage] = useState("");
  const [pcConfiguration, setPcConfiguration] = useState("");
  const [loading, setLoading] = useState(false);

  const buildPc = () => {
    if (generation === "" || maxPrice === "" || usage === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    const prompt = `Build a PC for ${usage} with a maximum price of $${maxPrice} using generation ${generation}.`;

    // Make API call to GPT-3 to generate PC configuration
    // Replace this fetch call with your actual implementation
    fetch("YOUR_GPT_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_GPT_API_KEY",
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
      .then(data => {
        console.log("PC Configuration:", data.choices[0].message.content);
        setPcConfiguration(data.choices[0].message.content);
      })
      .catch(error => {
        console.error("Error building PC:", error);
        Alert.alert("Error", "An error occurred while building the PC. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    
    <View style={styles.container}>

      <TouchableOpacity style={styles.overlayTrigger} onPress={() => setMostrarOverlay(!mostrarOverlay)}>
        <Text style={styles.overlayTriggerText}>{mostrarOverlay ? "Fechar Overlay" : "Abrir Overlay"}</Text>
      </TouchableOpacity>
      {mostrarOverlay && (
        <View style={styles.overlay}>
          {/* Conteúdo do overlay aqui */}
          <TouchableOpacity>
            <Text style={styles.overlayContent}> Cozinha Fácil </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.overlayContent}> ColorMix </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.overlayContent}> Moda Inteligente </Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.header}>PC Builder</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Generation:</Text>
        <TextInput
          placeholder="Enter PC generation"
          style={styles.input}
          value={generation}
          onChangeText={text => setGeneration(text)}
        />
        <Text style={styles.label}>Max Price:</Text>
        <TextInput
          placeholder="Enter max price"
          style={styles.input}
          value={maxPrice}
          onChangeText={text => setMaxPrice(text)}
        />
        <Text style={styles.label}>Usage:</Text>
        <TextInput
          placeholder="Enter PC usage"
          style={styles.input}
          value={usage}
          onChangeText={text => setUsage(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={buildPc}>
        <Text style={styles.buttonText}>Build PC</Text>
      </TouchableOpacity>
      <ScrollView style={styles.containerScroll} showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={styles.content}>
            <Text style={styles.title}>Building PC...</Text>
          </View>
        )}
        {pcConfiguration !== "" && (
          <View style={styles.content}>
            <Text style={styles.title}>PC Configuration:</Text>
            <Text style={styles.pcConfiguration}>{pcConfiguration}</Text>
          </View>
        )}
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
    marginTop: 20,
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
  pcConfiguration: {
    lineHeight: 24
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
    zIndex: 2, // Definindo zIndex para garantir que fique sobreposto
  },
  overlayTrigger: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#FF5656',
    borderRadius: 5,
    zIndex: 3, // Ajustando zIndex para ficar acima do overlay
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
});

export default PcBuilder;
