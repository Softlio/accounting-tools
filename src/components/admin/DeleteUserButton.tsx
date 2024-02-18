"use client";
import { deleteUser } from '@/lib/actions';
import translations from '@/translations/getTranslation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const initialState = {
    message: '',
    success: false,
};

const DeleteUserButton = ({
    id
}: {
    id: string
}) => {
    const [state, formAction] = useFormState(deleteUser, initialState)
    const navigation = useRouter()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (state.success) {
            setOpen(false)
            toast.success(translations.customer.delete.success);
            navigation.push('/admin/customers')
        }
    }, [state, navigation])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                <button className=' hover:bg-red-500 hover:brightness-90 hover:text-white transition-colors px-4 py-3 text-red-500 border-red-500 border-2 rounded-md'>{translations.customer.delete.label}</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{translations.customer.delete.title}</DialogTitle>
                    <DialogDescription>
                        {translations.customer.delete.description}
                    </DialogDescription>
                </DialogHeader>
                <form className='mt-4 flex justify-end' action={formAction}>
                    {(state.message && !state.success) && <p className="text-red-500">{state.message}</p>}
                    <input type='hidden' value={id} name="id" />
                    <button type='submit' className='bg-red-500 text-white px-4 py-3 rounded-md'>{translations.customer.delete.label}</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteUserButton