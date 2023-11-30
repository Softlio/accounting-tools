"use client"
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from 'react'
import { useRouter } from "next/navigation";

const RefreshButton = () => {
    const router = useRouter();

    return (
        <Button className="w-10 h-10 p-1 bg-theme-dark hover:bg-theme-dark/80" onClick={() => {
            router.refresh();
        }}>
            <RotateCw size={16} />
        </Button>
    )
}

export default RefreshButton