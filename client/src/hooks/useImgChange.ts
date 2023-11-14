import { useRef, ChangeEvent, DragEvent } from 'react';

const useImgChange = (handleClick: (img: File) => void) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImgChange = (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>,
  ) => {
    let img: File | null = null;

    if (
      'dataTransfer' in e &&
      e.dataTransfer?.files &&
      e.dataTransfer.files.length > 0
    ) {
      if (e.dataTransfer && e.dataTransfer.files) {
        img = e.dataTransfer.files[0];
      }
    } else if (e.target instanceof HTMLInputElement && e.target.files) {
      img = e.target.files[0];
    }
    if (imgRef.current && !img) {
      imgRef.current.src = '/logos.png';
      return;
    }

    if (img) {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          if (imgRef.current && typeof reader.result === 'string') {
            imgRef.current.src = reader.result;
          }
        };

        reader.readAsDataURL(img);
        handleClick(img);
      } catch (e) {
        alert(e);
      }
    }
  };

  return { handleImgChange, imgRef };
};

export default useImgChange;
