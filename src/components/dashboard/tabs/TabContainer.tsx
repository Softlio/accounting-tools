import FadeInAnimation from "@/components/animations/FadeInAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            <FadeInAnimation index={2}>
                <Card className=" rounded-none">
                    <CardHeader>
                        <CardTitle className=" text-4xl leading-none">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
            </FadeInAnimation>
        </TabsContent>
    );
};

export default TabContainer;
