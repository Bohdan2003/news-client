import { useRef, useEffect } from "react";

import img from "../../assets/imagenophoto.svg";

export const PreviewImage = ({ SUPPORTED_FORMATS, file, selectingFile, classNames="", defaultImg = img }) => {
    const imgRef = useRef();
    
    useEffect(() => {
        if(SUPPORTED_FORMATS.includes(file?.type)){
            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    imgRef.current.setAttribute('src', reader.result);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            imgRef.current.setAttribute('src', defaultImg);
        }
    }, [file])
    
    return (
        <div className={classNames} onClick={selectingFile}>
            <img 
                ref={imgRef} 
                src={defaultImg}
                alt="preview"
            />
        </div>
    )
}