import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [permissaoConcedida, setPermissaoConcedida] = useState(false);
  const [localizacao, setLocalizacao] = useState(null);
  
  
  useEffect(() => {
    const pedirPermissao = async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();     
      if (status === 'granted') {
        setPermissaoConcedida(true);
        console.log("Uhul! O usuário deixou rastrear!");
 
        const posicaoNativa = await Location.getCurrentPositionAsync({});
        
        setLocalizacao(posicaoNativa);
      } else {
        console.log("Fomos bloqueados. Game over.");
      }
    };

    pedirPermissao();
  }, []);

  return (
    <View style={styles.container}>
     {localizacao ? (
    <MapView 
        style={styles.mapaForte}
        initialRegion={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            latitudeDelta: 0.005, 
            longitudeDelta: 0.005,
        }}
    >
        <Marker 
            coordinate={{
                latitude: localizacao.coords.latitude,
                longitude: localizacao.coords.longitude,
            }}
            title="Eu estou aqui!"
            description="Defeito do motor"
        />
    </MapView>
) : (
    <Text>Buscando sua posição pelo Satélite...</Text>
)}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapaForte: {
  width: '100%',
  height: 250, 
  borderRadius: 10,
  marginTop: 20
}
});