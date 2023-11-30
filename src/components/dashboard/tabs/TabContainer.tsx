import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

type Props = {
    value: string;
    title: string;
    children: React.ReactNode;
};

const TabContainer: React.FC<Props> = ({ value, title, children }) => {
    return (
        <TabsContent value={value} className="w-full mt-4">
            <Card className=" rounded-none">
                <CardHeader>
                    <CardTitle className=" text-4xl leading-none">{title}</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </TabsContent>
    );
};

export default TabContainer;
