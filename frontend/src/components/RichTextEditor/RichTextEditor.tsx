import React, { useState, useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import { CustomElement } from './editor.types';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { Toolbar } from './Toolbar';
import { withLinks, toggleMark } from './editorUtils'; // Importando toggleMark para atalhos
import styles from './RichTextEditor.module.css';

// 1. Definimos a interface para as props que o componente vai receber
interface RichTextEditorProps {
  value: CustomElement[];
  setValue: React.Dispatch<React.SetStateAction<CustomElement[]>>;
}

// 2. Usamos React.FC e a interface para tipar o componente e desestruturamos as props
const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, setValue }) => {
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), []);
  
  // 3. O useState local para 'value' foi REMOVIDO daqui. O componente agora é "controlado" pelo pai.

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  return (
    // 4. Usamos as props 'value' e 'setValue' diretamente no componente Slate
    <Slate
      editor={editor}
      initialValue={value} // <- Agora usa a prop vinda do App.tsx
      onChange={newValue => setValue(newValue as CustomElement[])} // <- Agora chama a função do App.tsx
      key={JSON.stringify(value)} // Adicionar esta chave ajuda o React a re-renderizar corretamente quando o valor inicial muda
    >
      <Toolbar />
      <Editable
        className={styles.editableArea}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Digite algo..."
        spellCheck
        autoFocus
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case 'b': {
              event.preventDefault();
              toggleMark(editor, 'bold');
              break;
            }
            case 'i': {
              event.preventDefault();
              toggleMark(editor, 'italic');
              break;
            }
             case 'u': {
              event.preventDefault();
              toggleMark(editor, 'underline');
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export default RichTextEditor;