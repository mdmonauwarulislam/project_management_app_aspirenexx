import {useEffect} from 'react';


export default function Modal({ content, title, footer, hideHeader, isOpen, height, maxHeight, clickEffect, styles }) {
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
    }

    return () => (window.document.body.style.overflow = 'auto');
  }, [isOpen]);

  return (
    <div className='flex w-full modal-wrapper' style={{display: !isOpen && 'none'}}>
      <div className="w-full mr-4" >
        {!hideHeader && <div className="modal-header">
          {title && <span className="modal-title md:text-[22px] text-[16px] font-semibold">{title}</span>}
        </div>}
        <div className="modal-content" style={styles}>
          {content}
        </div>
        {footer && <div className="modal-footer">
          {footer}
        </div>}
        <button
            type="button"
            className="md:text-[22px] text-[16px] font-semibold px-3 mt-4 border-2 border-gray-700 hover:bg-red-200 bg-white rounded-md text-black"
            title="Close modal"
            tabIndex={0}
            onClick={() => {
              clickEffect(isOpen);
            }}
          >
            X
          </button>
      </div>
    </div>
  );
}
