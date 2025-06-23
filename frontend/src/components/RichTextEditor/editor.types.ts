/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

// Tipos para formatação de texto (folhas)
export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

// Tipos para os elementos de bloco
type ParagraphElement = { type: 'paragraph'; align?: 'left' | 'center' | 'right'; children: FormattedText[] };
type HeadingOneElement = { type: 'heading-one'; align?: 'left' | 'center' | 'right'; children: FormattedText[] };
type HeadingTwoElement = { type: 'heading-two'; align?: 'left' | 'center' | 'right'; children: FormattedText[] };
type BlockQuoteElement = { type: 'block-quote'; align?: 'left' | 'center' | 'right'; children: FormattedText[] };
type BulletedListElement = { type: 'bulleted-list'; align?: 'left' | 'center' | 'right'; children: ListItemElement[] };
type ListItemElement = { type: 'list-item'; align?: 'left' | 'center' | 'right'; children: FormattedText[] };
type LinkElement = { type: 'link'; url: string; children: FormattedText[] };

export type CustomElement =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | BlockQuoteElement
  | BulletedListElement
  | ListItemElement
  | LinkElement;

// Estendendo os tipos base do Slate com nossos tipos customizados
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    //@ts-expect-error
    Editor: CustomEditor;
    //@ts-expect-error
    Element: CustomElement;
    //@ts-expect-error
    Text: FormattedText;
  }

}