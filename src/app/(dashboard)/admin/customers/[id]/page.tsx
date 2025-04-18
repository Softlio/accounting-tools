import DeleteUserButton from '@/components/admin/DeleteUserButton'
import EditInfoForm from '@/components/customer/forms/EditInfoForm'
import ReInviteUser from '@/components/customer/forms/ReInviteUser'
import ToolAccessForm from '@/components/customer/forms/ToolAccessForm'
import Title from '@/components/shared/Title'
import { prisma } from '@/lib/prisma'
import { Tool, ToolAccess, User } from '@prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        id: string
    }
}

type DataResult = {
    user: Omit<User, 'password' | 'pending' | 'active' | 'firstLogin'>
    toolAccess: ToolAccess[],
    tools: Tool[]
}

const getData = async (id: string): Promise<DataResult | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            id: true,
        }
    })

    if (!user) {
        return null
    }

    const toolAccess = await prisma.toolAccess.findMany({
        where: {
            userId: id
        }
    })

    if (!toolAccess) {
        return null
    }

    const tools = await prisma.tool.findMany({});

    if (!tools) {
        return null
    }

    return {
        user,
        toolAccess,
        tools
    }
}

const UserPage: React.FC<Props> = async ({
    params: { id }
}) => {

    if (!id) {
        return notFound();
    }

    const data = await getData(id)
    if (!data) {
        return notFound();
    }

    return (
        <section className="min-h-[80vh]">
            <div className='container flex flex-col py-12 mx-auto mb-12'>
                <Title className='text-4xl md:text-5xl'>
                    {data.user.firstName} {data.user.lastName}
                </Title>
                <hr className='my-3' />

                <div className='max-w-xl'>
                    <h2 className='font-serif text-3xl font-bold'>Info</h2>
                    <EditInfoForm {...data.user} />

                </div>
                <div className='max-w-xl'>
                    <ReInviteUser {...data.user} />
                </div>


                <hr className='my-3' />

                <div className='max-w-xl'>
                    <h2 className='font-serif text-3xl font-bold'>Tools</h2>
                    <ToolAccessForm {...data} />
                </div>
                <hr className='mt-8 mb-6' />
                <DeleteUserButton id={id} />
            </div>
        </section>
    )
}

export default UserPage