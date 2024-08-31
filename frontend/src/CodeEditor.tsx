import React, { useState, useRef, useEffect, useCallback } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useTranslation } from "react-i18next";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

interface Props {
  code: string;
  title: string;
  lang: string;
  onChangeCode: (val: string) => void;
  onReset: () => void;
}
export function CodeEditor({
  code,
  title,
  onChangeCode,
  onReset,
  lang,
}: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<any | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChangeCode(value);
    }
  };

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (editorRef.current && containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          editorRef.current?.layout();
        });
      });

      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [isFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`min-h-[640px] flex justify-center ${
        isFullscreen ? "fixed inset-0 z-50 bg-black" : ""
      }`}
      style={isFullscreen ? { backgroundColor: "black" } : {}}
    >
      <div className={`w-full ${isFullscreen ? "h-full" : "max-w-xl"}`}>
        <div className="flex items-center justify-center">
          <label
            htmlFor={title}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {title}
          </label>
          <button
            onClick={onReset}
            className="text-sm text-gray-500 mb-2 ml-2 hover:text-gray-700"
            aria-label={t("codeEditor.reset.title")}
            title={t("codeEditor.reset.title")}
          >
            <i className="fas fa-redo"></i>
          </button>
          <button
            onClick={toggleFullscreen}
            className="text-sm text-gray-500 mb-2 ml-2 hover:text-gray-700"
            aria-label={t("codeEditor.toggleFullscreen.title")}
            title={t("codeEditor.toggleFullscreen.title")}
          >
            <i
              className={`fas ${isFullscreen ? "fa-compress" : "fa-expand"}`}
            ></i>
          </button>
        </div>
        <MonacoEditor
          height={isFullscreen ? "calc(100vh - 2rem)" : "600px"}
          width={isFullscreen ? "100vw" : "100%"}
          language={lang}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark" // Set theme (optional)
          options={{
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
            minimap: { enabled: false }, // Disable minimap for a cleaner look
            scrollBeyondLastLine: false, // Prevent scrolling beyond the last line
          }}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
