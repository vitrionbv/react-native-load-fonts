# @vitrion/react-native-load-fonts

A powerful and flexible library that allows you to load fonts dynamically at runtime via base64 encoded TTF or OTF on your React Native application.

[![npm version](https://img.shields.io/npm/v/\@vitrion/react-native-load-fonts.svg)](https://www.npmjs.com/package/\@vitrion/react-native-load-fonts)
[![MIT License](https://img.shields.io/npm/l/\@vitrion/react-native-load-fonts.svg?style=flat)](https://npmjs.org/package/\@vitrion/react-native-load-fonts)

## Screenshots

|             iOS              |                         Android                          |
|:----------------------------:|:--------------------------------------------------------:|
| ![iOS Screenshot](screenshots/ios.png) | ![Android Screenshot](./screenshots/android.png) |

## Features

- Load fonts dynamically at runtime
- Support for TTF and OTF font formats
- Base64 encoded fonts
- Built with TypeScript

## Installation

Install the package in your React Native project:

```
npm install @vitrion/react-native-load-fonts
```

## Usage
To load a font dynamically, you must first have a base64 string of your font file (TTF or OTF):
```javascript
import { loadFont, loadFonts, loadedFonts } from '@vitrion/react-native-load-fonts';

/* Load a single font */
loadFont('nameOfFont', base64FontString, 'ttf').then(function(name) {
	console.log('Loaded font successfully. Font name is: ', name);
});

/* Load a list of fonts */
loadFonts([{name: 'nameOfFont', data: base64FontString, type: 'ttf'}]).then(function(names) {
	console.log('Loaded all fonts successfully. Font names are: ', names);
});

console.log('Loaded fonts are: ', loadedFonts);
/* Be carefull this is not reactive, */

```

#### Font loading using file path
You can download font file to file system and then load it to app without sending base64 to bridge.

```javascript
import { loadFontFromFile } from '@vitrion/react-native-load-fonts';
import RNFetchBlob from 'rn-fetch-blob'

const fontFilePath = RNFetchBlob.fs.dirs.DocumentDir + "fonts/roboto.ttf";

loadFontFromFile("Roboto",  fontFilePath)
   .then(function(name) {
   	    console.log('Loaded font successfully. Font name is: ', name);
   });

```

More examples can be found in the [example](https://github.com/vitrionbv/react-native-load-fonts/tree/main/example) directory of the repository.

![iOS Screenshot](screenshots/code.png)


#### Note

On iOS, it isn't possible to specify the font name. For this reason BOTH Android and iOS return the ACTUAL registered font name. For Android this is whatever you pass in, for iOS it is whatever is embedded in the font. I suggest you always use the full name embedded in the font to avoid issues.

### Options

| Option | iOS      | Android | Info                                                                                                                                          |
|--------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| name   | Not used | Used    | Specify registered font name (doesn't work for iOS)                                                                                           |
| data   | Used     | Used    | This can be a data URI or raw base64... if it is raw base64 type must be specified, but defaults to TTF (data URI mime: font/ttf or font/otf) |
| type   | Used     | Used    | (optional) Specify the type of font in the encoded data (ttf or otf). Defaults to "ttf"                                                       |

### The Response

The ACTUAL name the font was registered with. Use this for your fontFamily.

## Contributing

See the [contributing guide](https://github.com/vitrionbv/react-native-load-fonts/blob/main/CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
