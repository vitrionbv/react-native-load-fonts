import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, View, Text, Pressable } from 'react-native';
import { loadedFonts, loadFont } from 'react-native-load-fonts';
import { base64fontBobaCups, base64fontDelight } from './Fonts';

export default function App() {
  const [font, setFont] = useState('');
  const [loadedFontsArray, setLoadedFonts] = useState({});
  const loadTestFont = (name: string, base64: string) => {
    loadFont(name, base64, 'ttf', true).then(function (n) {
      console.log('Loaded font successfully. Font name is: ', name);
      setFont(n);
    });
  };

  useEffect(() => {
    setLoadedFonts(loadedFonts);
  }, [font]);

  return (
    <View style={styles.container}>
      <Text
        style={{ fontFamily: font || 'Arial', fontSize: 20, marginBottom: 10 }}
      >
        Font test
      </Text>
      <Text>
        <Text style={{ fontWeight: 'bold' }}>Last loaded font:</Text>{' '}
        {font || 'Arial'}
      </Text>

      <Pressable
        onPress={() => {
          loadTestFont('Boba-Cups', base64fontBobaCups);
        }}
      >
        <Text style={{ color: '#4e8df8' }}>Load Font Bobacups</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          loadTestFont('Delight', base64fontDelight);
        }}
      >
        <Text style={{ color: '#4e8df8' }}>Load Font Delight</Text>
      </Pressable>
      <View>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Loaded Fonts:</Text>
        {Object.entries(loadedFontsArray).map(([name, fontName]) => (
          <Text key={name}>{fontName}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
