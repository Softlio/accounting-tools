"use client";

import { createUser } from "@/lib/actions";
import translations from "@/translations/getTranslation";
import { useFormState } from "react-dom";
import AddButton from "../shared/AddButton";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const initialState = {
    message: '',
};

const AddUserForm = () => {
    const [state, formAction] = useFormState(createUser, initialState)
    return (
        <Dialog>
            <DialogTrigger>
                <AddButton />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{translations.customer.add.title}</DialogTitle>
                <form action={formAction} className=" flex flex-col gap-2">
                    {state.message && <p className="text-red-500">{state.message}</p>}
                    <label htmlFor="firstName">
                        {translations.customer.add.form.firstName}
                    </label>
                    <Input type="text" name="firstName" placeholder={translations.customer.add.form.firstName} />
                    <label htmlFor="lastName">
                        {translations.customer.add.form.lastName}
                    </label>
                    <Input type="text" name="lastName" placeholder={translations.customer.add.form.lastName} />
                    <label htmlFor="email">
                        {translations.customer.add.form.email}
                    </label>
                    <Input type="text" name="email" placeholder={translations.customer.add.form.email} />
                    <label htmlFor="password">
                        {translations.customer.add.form.password}
                    </label>
                    <Input type="password" name="password" placeholder={translations.customer.add.form.password} />
                    <label htmlFor="passwordConfirmation">
                        {translations.customer.add.form.passwordConfirmation}
                    </label>
                    <Input type="password" name="passwordConfirmation" placeholder={translations.customer.add.form.passwordConfirmation} />

                    <label htmlFor="role">
                        {translations.customer.add.form.role.label}
                    </label>
                    <Select name="role">

                        <SelectTrigger>
                            <SelectValue placeholder={translations.customer.edit.form.rolePlaceholder} />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="USER">{translations.role.user}</SelectItem>
                            <SelectItem value="ADMIN">{translations.role.admin}</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit" className=" mt-3">{translations.customer.add.form.submit}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddUserForm