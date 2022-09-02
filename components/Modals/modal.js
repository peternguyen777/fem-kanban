import { Dialog } from "@headlessui/react";
import { useRef } from "react";

export function Modal({ onClose = () => {}, children }) {
  let overlayRef = useRef();

  return (
    <Dialog
      static
      open={true}
      onClose={onClose}
      initialFocus={overlayRef}
      className='fixed inset-0 z-10 flex items-start justify-end'
    >
      <Dialog.Overlay
        ref={overlayRef}
        className='fixed inset-0 bg-transparent'
      />
      <div className='relative'>{children}</div>
    </Dialog>
  );
}
