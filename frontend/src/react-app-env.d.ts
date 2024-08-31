/// <reference types="react-scripts" />

declare module '*.txt' {
  const content: string;
  export default content;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module "*.wasm" {
  const wasmModule: {
  instance: WebAssembly.Instance;
  module: WebAssembly.Module;
}
  export default wasmModule;
}