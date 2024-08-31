declare class Go {
  importObject: WebAssembly.Imports;

  constructor();

  run(instance: WebAssembly.Instance): Promise<void>;
}