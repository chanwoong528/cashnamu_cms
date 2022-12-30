import React from 'react'

const PageLayout = ({ children, pageTitle }) => {
    return (
        <main className='page'>
            <header>
                <h2>{pageTitle}</h2>
            </header>
            {children}
        </main>
    )
}

export default PageLayout