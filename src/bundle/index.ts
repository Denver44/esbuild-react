import * as esBuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugins';
import { fetchPlugin } from './plugins/fetch-plugins';

const startService = async () => {
  return esBuild.startService({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
  });
};

let service: esBuild.Service;
const bundle = async (rawCode: string) => {
  if (!service) {
    service = await startService();
  }
  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });
  return result.outputFiles[0].text;
};

export default bundle;
