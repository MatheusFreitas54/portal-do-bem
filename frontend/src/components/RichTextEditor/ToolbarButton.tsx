import React from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive, isBlockActive, isAlignmentActive, toggleMark, toggleBlock, toggleAlignment } from './editorUtils';
import styles from './RichTextEditor.module.css';
import { CustomEditor } from './editor.types';

type ButtonProps = {
  format: any;
  icon?: string; // Futuramente pode usar um ícone SVG
  type: 'mark' | 'block' | 'align';
};

export const ToolbarButton: React.FC<ButtonProps> = ({ format, icon, type }) => {
  const editor = useSlate() as CustomEditor;

  const getIsActive = () => {
    switch(type) {
      case 'mark':
        return isMarkActive(editor, format);
      case 'block':
        return isBlockActive(editor, format);
      case 'align':
        return isAlignmentActive(editor, format);
      default:
        return false;
    }
  }

  const handleToggle = () => {
     switch(type) {
      case 'mark':
        toggleMark(editor, format);
        break;
      case 'block':
        toggleBlock(editor, format);
        break;
      case 'align':
        toggleAlignment(editor, format);
        break;
    }
  }
  
  return (
    <button
      className={`${styles.toolbarButton} ${getIsActive() ? styles.activeButton : ''}`}
      onMouseDown={event => {
        event.preventDefault();
        handleToggle();
      }}
    >
      {icon || format}
    </button>
  );
};