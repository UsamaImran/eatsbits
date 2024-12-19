import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

function Portal({ children }: PropsWithChildren) {
  return ReactDOM.createPortal(
    <div>{children}</div>,
    document.getElementById('portal') as HTMLElement
  );
}

export default Portal;
