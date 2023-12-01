import Title from '@/components/shared/Title'
import React from 'react'

const NoTools = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center  text-center'>
            <Title className='text-5xl md:text-7xl text-theme-secondary'>
                No tools available
            </Title>
            <p className='max-w-xl'>
                You have no tools available. To get access to tools, please contact the administrator. Or go to the tool store to buy tools.
            </p>
        </div>
    )
}

export default NoTools