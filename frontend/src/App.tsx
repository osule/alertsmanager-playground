/// <reference path="./types/wasm_exec.d.ts" />

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import initContextDataObject from "./initContextData.json";
import initTemplateObject from "./initTemplate.txt";
import CodeEditor from "./CodeEditor";

const initContextData = JSON.stringify(initContextDataObject, null, 4);
const initTemplate = initTemplateObject;
const initPreview = "";

function App() {
  const [template, setTemplate] = useState(initTemplate);
  const [contextData, setContextData] = useState(initContextData);
  const [preview, setPreview] = useState(initPreview);
  const [isReady, setIsReady] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkRenderFunction = () => {
      if (typeof window.render === "function") {
        setIsReady(true);
      } else {
        setTimeout(checkRenderFunction, 100);
      }
    };
    checkRenderFunction();
  }, []);

  useEffect(() => {
    if (isReady) {
      setPreview(window.render(template, contextData));
    } else {
      console.error(
        "Render function is not available after loading WebAssembly."
      );
    }
  }, [template, contextData, isReady]);

  const onResetTemplate = () => {
    setTemplate(initTemplate);
  };

  const onResetContextData = () => {
    setContextData(initContextData);
  };

  return (
    <div className="App min-h-screen flex bg-gray-100">
      <div className="w-full mr-4 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="p-5">
            <div>
              <h1 className="text-4xl font-mono font-bold text-gray-800 mb-4">
                {t("heading")}
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <div className="p-5 rounded min-w-[400px]">
            <CodeEditor
              lang={`html`}
              title={t("template.title")}
              code={template}
              onChangeCode={setTemplate}
              onReset={onResetTemplate}
            ></CodeEditor>
          </div>
          <div className="p-5 rounded min-w-[400px]">
            <CodeEditor
              lang={`json`}
              title={t("contextdata.title")}
              code={contextData}
              onChangeCode={setContextData}
              onReset={onResetContextData}
            ></CodeEditor>
          </div>

          <div className="p-5">
            <p className="block text-sm font-medium text-gray-700 mb-2">
              {t("preview.title")}
            </p>
            <div
              className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-5"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
