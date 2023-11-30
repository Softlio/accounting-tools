import React from 'react'
import translation from "@/translations/getTranslation";

const UnderConstruction = () => {
    return (
        <p className=' text-5xl text-center font-serif text-theme-dark font-black'>
            {translation.global.under_construction}
        </p>
    )
}

export default UnderConstruction