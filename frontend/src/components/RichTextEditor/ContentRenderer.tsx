/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text } from 'slate';
import { CustomElement, FormattedText } from '../RichTextEditor/editor.types';
import { Element } from '../RichTextEditor/Element'; // Reutilizando nosso componente!
import styles from './ContentRenderer.module.css';

// Interface para as props do nosso renderer
interface ContentRendererProps {
  content: CustomElement[];
}

// Componente recursivo que sabe como renderizar um único nó
const Node = ({ node }: { node: CustomElement | FormattedText }): JSX.Element => {
  // Se o nó for de texto (uma "folha"), aplicamos a formatação (negrito, itálico, etc.)
  if (Text.isText(node)) {
    let textNode: React.ReactNode = node.text;

    if (node.bold) {
      textNode = <strong>{textNode}</strong>;
    }
    if (node.italic) {
      textNode = <em>{textNode}</em>;
    }
    if (node.underline) {
      textNode = <u>{textNode}</u>;
    }
    if (node.code) {
      textNode = <code>{textNode}</code>;
    }
    // Retornamos o texto com as tags de formatação aplicadas
    return <>{textNode}</>;
  }
  
  // Se não for texto, é um elemento (parágrafo, título, etc.)
  // Renderizamos seus filhos recursivamente chamando o componente Node para cada um
  const children = node.children.map((n, i) => <Node key={i} node={n} />);

  // Usamos nosso componente Element já existente para renderizar a tag correta (<h1>, <p>, <a>, etc.)
  // Passamos atributos "falsos" porque eles são exigidos pela prop, mas não são necessários para a renderização somente leitura.
  const attributes: any = { 'data-slate-node': 'element' as const, 'data-slate-inline': false, 'data-slate-void': false, ref: null };
  
  return <Element element={node} attributes={attributes}>{children}</Element>;
};


/**
 * Componente somente leitura para exibir o conteúdo do editor Slate a partir de um JSON.
 */
export const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  return (
    <article className={styles.article}>
      {content.map((node, i) => (
        <Node key={i} node={node} />
      ))}
    </article>
  );
};