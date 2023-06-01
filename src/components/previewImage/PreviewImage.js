import { memo, useRef, useEffect } from "react";

import img from "../../assets/imagenophoto.svg";

export const PreviewImage = memo(({ SUPPORTED_FORMATS, file, selectingFile, nameClass="", setFieldValue, defaultImg = img }) => {
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

    const highlight = e => {
        e.preventDefault()
        e.target.classList.add(`${nameClass}--hover`)
    }

    const unhighlight = e => {
        e.preventDefault()
        e.target.classList.remove(`${nameClass}--hover`)
    }
    
    return (
        <div 
            className={nameClass} 
            onClick={selectingFile}
            onDragEnter={highlight}
            onDragOver={highlight}
            onDragLeave={unhighlight}
            onDrop={e => {
                setFieldValue("file", e.dataTransfer.files[0])
                unhighlight(e);
            }}
        >
            <img 
                ref={imgRef} 
                src={defaultImg}
                alt="preview"
            />
        </div>
    )
})