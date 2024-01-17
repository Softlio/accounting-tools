import Title from '@/components/shared/Title'
import getTranslation from '@/translations/getTranslation'

const NoTools = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center  text-center'>
            <Title className='text-5xl md:text-7xl text-theme-secondary'>
                {getTranslation.noTools.title}
            </Title>
            <p className='max-w-xl'>
                {getTranslation.noTools.description}
            </p>
        </div>
    )
}

export default NoTools