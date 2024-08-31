declare global {
  interface Window {
    render: (template: string, contextData: string) => string;
    Go: () => void;
  }
}

export {};