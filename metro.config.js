// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Asegurar que se procesen correctamente los archivos de audio y assets
config.resolver.assetExts.push('wav', 'mp3', 'json');

// Agregar soporte para CSS en web
config.resolver.sourceExts.push('css');

module.exports = config;
