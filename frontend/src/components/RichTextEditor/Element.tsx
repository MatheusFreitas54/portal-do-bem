import React from 'react';
import { RenderElementProps } from 'slate-react';

export const Element: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return <blockquote style={style} {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul style={style} {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 style={style} {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 style={style} {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'link':
        return <a href={element.url} {...attributes}>{children}</a>
    default:
      return <p style={style} {...attributes}>{children}</p>;
  }
};