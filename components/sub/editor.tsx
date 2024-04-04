import { MDXEditor, MDXEditorMethods, headingsPlugin } from "@mdxeditor/editor";
import { FC } from 'react';

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  onChange?: (newContent: string) => void; // Add onChange callback
}

const Editor: FC<EditorProps> = ({ markdown, editorRef, onChange }) => {
  const handleChange = (newContent: string) => {
    // Call onChange callback with the new content
    if (onChange) {
      onChange(newContent);
    }
  };

  return <MDXEditor ref={editorRef} markdown={markdown} onChange={handleChange} plugins={[headingsPlugin()]} />;
};

export default Editor;