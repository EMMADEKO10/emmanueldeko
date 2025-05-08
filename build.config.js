export default {
  target: 'node',
  platform: 'node',
  format: 'esm',
  external: ['path', 'os', 'crypto', 'fs', 'url'],
  node: {
    __dirname: false,
    __filename: false
  }
}; 