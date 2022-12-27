import React, { useState } from 'react'
import QuillEditor from '../../components/Elements/Form/QuillEditor'

const FAQAdd = () => {
    const [htmlText, setHtmlText] = useState("");
    const [FAQContext, setFAQContext] = useState({});


    return (
        <main className='page'>



            <QuillEditor setHtmlText={setHtmlText} />
        </main>
    )
}

export default FAQAdd