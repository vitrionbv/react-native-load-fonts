/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, View, Text, Pressable } from 'react-native';
import { loadedFonts, loadFont } from '@vitrion/react-native-load-fonts';
import {
  base64fontBobaCups,
  base64fontDelight,
  base64fontMerriweatherBold,
  base64fontMerriweatherRegular,
  base64fontVergillia,
} from './Fonts';

export default function App() {
  const [font, setFont] = useState('');
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [loadedFontsArray, setLoadedFonts] = useState({});
  const loadTestFont = (name: string, base64: string) => {
    loadFont(name, base64, 'ttf', true).then(function (n) {
      console.log('Loaded font successfully. Font name is: ', name);
      setFont(n);
      let newFont = n.toLowerCase();
      if (newFont.includes('_bold') || newFont.includes('-bold')) {
        setFontWeight('bold');
      } else {
        setFontWeight('normal');
      }
      if (newFont.includes('_italic') || newFont.includes('-italic')) {
        setFontStyle('italic');
      } else {
        setFontStyle('normal');
      }
    });
  };

  useEffect(() => {
    setLoadedFonts(loadedFonts);
  }, [font]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: font || 'Arial',
          fontSize: 20,
          marginBottom: 10,
          fontWeight,
          fontStyle,
        }}
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
      <Pressable
        onPress={() => {
          loadTestFont('Merriweather-Bold', base64fontMerriweatherBold);
        }}
      >
        <Text style={{ color: '#4e8df8' }}>Merriweather-Bold</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          loadTestFont('Merriweather', base64fontMerriweatherRegular);
        }}
      >
        <Text style={{ color: '#4e8df8' }}>Merriweather-Regular</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          loadTestFont('Vergillia', base64fontVergillia);
        }}
      >
        <Text style={{ color: '#4e8df8' }}>Load Vergillia</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setFont('Arial');
        }}
      >
        <Text style={{ color: '#4e8df8' }}>Default to Arial</Text>
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
