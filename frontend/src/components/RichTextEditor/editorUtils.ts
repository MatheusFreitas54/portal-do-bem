import { Editor, Transforms, Element, Range } from 'slate';
import { CustomEditor, CustomElement, FormattedText } from './editor.types';

const LIST_TYPES = ['bulleted-list'];

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// --- Funções de Marca (Negrito, Itálico, etc.) ---
export const isMarkActive = (editor: CustomEditor, format: keyof Omit<FormattedText, 'text'>) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: CustomEditor, format: keyof Omit<FormattedText, 'text'>) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// --- Funções de Bloco (Títulos, Listas, etc.) ---
export const isBlockActive = (editor: CustomEditor, format: CustomElement['type']) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  });

  return !!match;
};

export const toggleBlock = (editor: CustomEditor, format: CustomElement['type']) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });

  const newProperties: Partial<Element> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format as 'bulleted-list', children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// --- Funções de Alinhamento ---
export const isAlignmentActive = (editor: CustomEditor, align: 'left' | 'center' | 'right') => {
    const [match] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && Element.isElement(n) && n.align === align,
    });
    return !!match;
};

export const toggleAlignment = (editor: CustomEditor, align: 'left' | 'center' | 'right') => {
    Transforms.setNodes(editor,
        { align },
        { match: n => Editor.isBlock(editor, n) }
    );
};


// --- Funções de Link ---
export const isLinkActive = (editor: CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
  return !!link;
};

export const unwrapLink = (editor: CustomEditor) => {
  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};

export const wrapLink = (editor: CustomEditor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: CustomElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

// Plugin customizado para links
export const withLinks = (editor: CustomEditor) => {
    const { insertData, insertText, isInline } = editor;

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element);
    };

    return editor;
}