"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tool, ToolAccess, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

type Props = {
    user: Omit<User, "password">;
    tools: Tool[];
    toolAccess: ToolAccess[];
};

const ToolAccessForm: React.FC<Props> = ({ tools, toolAccess, user }) => {
    const navigator = useRouter();

    const updateToolAccess = async (toolId: string, checked: boolean) => {
        const res = await fetch(`/api/access/update`, {
            method: "POST",
            body: JSON.stringify({
                toolId,
                value: checked,
                userId: user.id,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            toast.error("Something went wrong");
            navigator.refresh();
            return;
        }

        toast.success("Tool access updated");
        navigator.refresh();
    };

    return (
        <div>
            <p className="pb-6">
                Manage tool access for this user. This is a list of all tools in the
                system.
            </p>
            <div>
                <ul>
                    {tools.map((tool) => {
                        const checked = toolAccess.some((ta) => ta.toolId === tool.id && ta.access === true);

                        return (
                            <div
                                key={tool.id}
                                className="flex items-center justify-between space-x-2 gap-3"
                            >
                                <Label className="flex flex-col space-y-1">
                                    <span className="text-xl font-bold text-theme-primary">
                                        {tool.name}
                                    </span>
                                    <span className="font-normal text-lg leading-snug text-muted-foreground">
                                        {tool.description}
                                    </span>
                                </Label>
                                <Switch
                                    defaultChecked={checked}
                                    onCheckedChange={(checked) => {
                                        updateToolAccess(
                                            tool.id,
                                            checked
                                        );
                                    }}
                                />
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ToolAccessForm;
