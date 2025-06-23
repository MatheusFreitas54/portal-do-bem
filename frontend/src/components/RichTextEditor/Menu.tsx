import React from 'react'
import { css, cx } from '@emotion/css'
import { BaseProps } from './types';

export const Menu = React.forwardRef<HTMLDivElement, BaseProps>((props, ref) => {
    props.className = 1;
    return <div {...props} data-test-id="menu" ref={ref} className={cx(
        (props.className as string),
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}>
    </div>
});

export default Menu;