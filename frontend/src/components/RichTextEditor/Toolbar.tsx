import React from 'react';
import { useSlate } from 'slate-react';
import { wrapLink, isLinkActive, unwrapLink, isUrl } from './editorUtils';
import { ToolbarButton } from './ToolbarButton';
import styles from './RichTextEditor.module.css';
import { CustomEditor } from './editor.types';

export const Toolbar: React.FC = () => {
  const editor = useSlate() as CustomEditor;
  
  // A LÓGICA DESTA FUNÇÃO FOI COMPLETAMENTE ATUALIZADA
  const handleLink = () => {
    // 1. Primeiro, verifica se o cursor já está em um link
    if (isLinkActive(editor)) {
      // 2. Se estiver, apenas remove o link, transformando-o em texto normal.
      unwrapLink(editor);
    } else {
      // 3. Se não estiver em um link, pede a URL ao usuário.
      const url = window.prompt('Insira a URL do link:');
      if (!url) return; // Se o usuário cancelar, não faz nada.

      // 4. Valida a URL inserida antes de criar o link.
      if (!isUrl(url)) {
        alert('URL inválida. Por favor, insira uma URL completa (ex: https://google.com)');
        return;
      }
      
      wrapLink(editor, url);
    }
  };
  
  return (
    <div className={styles.toolbar}>
      <ToolbarButton type="mark" format="bold" icon="B" />
      <ToolbarButton type="mark" format="italic" icon="I" />
      <ToolbarButton type="mark" format="underline" icon="U" />
      <ToolbarButton type="mark" format="code" icon="<>" />
      <span className={styles.separator} />
      <ToolbarButton type="block" format="heading-one" icon="H1" />
      <ToolbarButton type="block" format="heading-two" icon="H2" />
      <ToolbarButton type="block" format="block-quote" icon='"' />
      <ToolbarButton type="block" format="bulleted-list" icon="Lista" />
      {/* <span className={styles.separator} />
      <ToolbarButton type="align" format="left" icon="Left" />
      <ToolbarButton type="align" format="center" icon="Center" />
      <ToolbarButton type="align" format="right" icon="Right" /> */}
      <span className={styles.separator} />
      <button 
        className={`${styles.toolbarButton} ${isLinkActive(editor) ? styles.activeButton : ''}`}
        onMouseDown={handleLink}>
        Link
      </button>
    </div>
  );
};