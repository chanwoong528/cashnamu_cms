import React, { useEffect } from 'react'
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";


const QuillEditor = ({ setHtmlText }) => {
    const { quill, quillRef } = useQuill();
    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                console.log(quillRef.current.firstChild.innerHTML);
                setHtmlText(quillRef.current.firstChild.innerHTML)
            })
        }
    }, [quill])
    return (
        <div style={{ width: 1000, height: 300 }}>
            <div ref={quillRef} />
        </div>
    )
}

export default QuillEditor