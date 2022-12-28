import React, { useEffect, forwardRef } from 'react'
import "quill/dist/quill.snow.css";

const QuillEditor = ({ setHtmlContent, htmlContent, quill }, ref) => {
    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                setHtmlContent(ref.current.firstChild.innerHTML)
            })
            if (htmlContent !== "") {
                quill.setContents(quill.clipboard.convert(htmlContent), 'silent')
            }
        }
    }, [quill])

    return (
        <div ref={ref} style={{ height: 400 }} />
    )
}

export default forwardRef(QuillEditor)