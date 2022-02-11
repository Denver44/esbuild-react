import * as esBuild from 'esbuild-wasm';
import localForage from 'localforage';
import axios from 'axios';

const fileCache = localForage.createInstance({
  name: 'fileCache', // name of our DB
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esBuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }
        // const cachedResult = await fileCache.getItem<esBuild.OnLoadResult>(
        //   args.path
        // );
        // if (cachedResult) {
        //   return cachedResult;
        // }

        const { data, request } = await axios.get(args.path);

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
        const contents =
          fileType === 'css'
            ? `
        const style = document.createElement('style');
        style.innerText = 'body { background-color : "red" }';
        document.head.appendChild(style);
        `
            : data;

        const result: esBuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
