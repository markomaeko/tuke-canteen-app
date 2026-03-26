const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  ...(Array.isArray(config.resolver.blockList) ? config.resolver.blockList : []),
  new RegExp(path.resolve(__dirname, 'proxy').replace(/[/\\]/g, '[/\\\\]') + '.*'),
];

module.exports = config;
