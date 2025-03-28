"use client";
import FadeInAnimation from "@/components/animations/FadeInAnimation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeTax from "@/tools/IncomeTax";
import { Tool } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import NoTools from "./NoTools";

type Props = {
    tools: Tool[];
    userId: string;
};

const ToolTabMap: Record<string, React.FC<{ id: string }>> = {
    "inkomsten-belasting": IncomeTax,
};

const ToolTabs: React.FC<Props> = ({ tools, userId }) => {
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

    if (!tools.length) {
        return <NoTools />;
    }

    return (
        <Tabs
            value={selectedTab}
            onValueChange={(value) => {
                setSelectedTab(value);
            }}
        >
            <FadeInAnimation index={1}>
                <TabsList>
                    {tools.map((tool) => (
                        <TabsTrigger key={tool.id} value={tool.slug}>
                            {tool.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </FadeInAnimation>
            {tools.map((tool) => {
                const ToolTab = ToolTabMap[tool.slug];
                if (!ToolTab) {
                    return null;
                }
                return <Fragment key={tool.id}><ToolTab id={userId} /></Fragment>;
            })}
        </Tabs>
    );
};

export default ToolTabs;
