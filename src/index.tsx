import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-load-fonts' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const LoadFonts = NativeModules.LoadFonts
  ? NativeModules.LoadFonts
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
interface FontData {
  name: string;
  data: string;
  type: string;
}
export const loadedFonts: { [name: string]: string } = {};
export function loadFont(
  name: string,
  data: string,
  type: string,
  forceLoad?: boolean
): Promise<string> {
  /* Check if this font was already loaded */
  if (!forceLoad && loadedFonts[name]) {
    const loadedFont = loadedFonts[name];
    if (loadedFont) {
      return Promise.resolve(loadedFont);
    }
  }

  /* Load font via native binary code */
  return new Promise((resolve, reject) => {
    LoadFonts.loadFont(
      {
        name: name,
        data: data,
        type: type,
      },
      (err: Error | null, givenName?: string) => {
        if (err) {
          reject(err);
          return;
        }

        /* Loaded successfully... resolve promise with "real" font name */
        loadedFonts[name] = givenName!;
        resolve(givenName!);
      }
    );
  });
}

export function loadFontFromFile(
  name: string,
  filePath: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    LoadFonts.loadFontFromFile(
      {
        name,
        filePath,
      },
      (err: Error | null, givenName?: string) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(givenName!);
      }
    );
  });
}

export function loadFonts(
  fontList: FontData[] | FontData,
  forceLoad?: boolean
): Promise<string[]> {
  const _fontList: FontData[] = Array.isArray(fontList) ? fontList : [fontList];

  if (!_fontList.length) {
    return Promise.resolve([]);
  }

  return Promise.all(
    _fontList
      .filter((font) => font)
      .map((font) => loadFont(font.name, font.data, font.type, forceLoad))
  );
}

export function getLoadedFonts(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    LoadFonts.getLoadedFonts((error: Error | null, iLoadedFonts: string[]) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(iLoadedFonts);
    });
  });
}
