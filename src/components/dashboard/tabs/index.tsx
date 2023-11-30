"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tool } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

type Props = {
    tools: Tool[];
};

const ToolTabMap: Record<string, React.ReactNode> = {
    "inkomsten-belasting": (
        <TabsContent value="inkomsten-belasting">Inkomsten belasting</TabsContent>
    ),
};

const ToolTabs: React.FC<Props> = ({ tools }) => {
    const navigation = useRouter();
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(
        searchParams.get("tool") ?? tools[0]?.slug
    );

    useEffect(() => {
        setSelectedTab(searchParams.get("tool") ?? tools[0]?.slug);
    }, [searchParams, tools]);


    useEffect(() => {
        if (!selectedTab) {
            return;
        }
        navigation.replace(`/dashboard?tool=${selectedTab}`);
    }, [navigation, selectedTab]);

    return (
        <Tabs
            value={selectedTab}
            onValueChange={(value) => {
                setSelectedTab(value);
            }}
            className="w-[400px]"
        >
            <TabsList>
                {tools.map((tool) => (
                    <TabsTrigger key={tool.id} value={tool.slug}>
                        {tool.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tools.map((tool) => {
                const ToolTab = ToolTabMap[tool.slug];
                if (!ToolTab) {
                    return null;
                }
                return <Fragment key={tool.id}>{ToolTab}</Fragment>;
            })}
        </Tabs>
    );
};

export default ToolTabs;
