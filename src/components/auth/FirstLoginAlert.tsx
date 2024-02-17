"use client"
import { firstLogin } from '@/lib/actions'
import translation from '@/translations/getTranslation'
import React from 'react'
import { useFormState } from 'react-dom'
import { Button } from '../ui/button'
import { Dialog, DialogContentWithoutClose, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'

const initialState = {
    message: '',
};

const FirstLoginAlert: React.FC<{
    id?: string
}> = ({
    id
}) => {
        const [state, formAction] = useFormState(firstLogin, initialState);

        if (!id) return null;

        return (
            <Dialog open>
                <DialogContentWithoutClose>
                    <DialogHeader>
                        <DialogTitle>
                            {translation.dialog.firstLogin.title}
                        </DialogTitle>
                        <DialogDescription>
                            {translation.dialog.firstLogin.description}
                        </DialogDescription>
                        <section className='flex flex-col'>
                            <p className='mt-8 mb-4 text-sm text-theme-secondary'>
                                {translation.dialog.firstLogin.newPasswordExplanation}
                            </p>

                            <form action={formAction} className="flex flex-col gap-2">
                                {state?.message && <p className="text-red-500">{state?.message}</p>}
                                <label htmlFor="password">
                                    {translation.firstLogin.password}
                                </label>
                                <Input name='password' placeholder={translation.firstLogin.password} type='password' />
                                <label htmlFor="confirm">
                                    {translation.firstLogin.confirmPassword}
                                </label>
                                <Input name="id" className='hidden' value={id} />
                                <Input name="confirm" className='mb-4' placeholder={translation.firstLogin.confirmPassword} type='password' />
                                <Button type='submit'>{translation.firstLogin.save}</Button>
                            </form>
                        </section>
                    </DialogHeader>
                </DialogContentWithoutClose>
            </Dialog>
        )
    }

export default FirstLoginAlert