"use client"
import { PlusIcon } from "lucide-react";

const AddButton = () => {

    return (
        <div className="w-10 h-10 p-1 bg-theme-dark hover:bg-theme-dark/80 flex flex-col justify-center items-center text-white rounded-md">
            <PlusIcon size={16} />
        </div>
    )
}

export default AddButton