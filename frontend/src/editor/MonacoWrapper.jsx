import { useRef } from "react";
import Editor from "@monaco-editor/react";

export default function MonacoWrapper({ value, onChange, readOnly = false }) {
  const editorRef = useRef(null);

  function handleMount(editor) {
    editorRef.current = editor;
  }

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="java"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        onMount={handleMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 8 },
        }}
      />
    </div>
  );
}
