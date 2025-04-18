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
    <TabsContent value={value} className="w-full mt-4 relative">
      <FadeInAnimation index={2}>
        <Card className="">
          <CardHeader>
            <CardTitle className=" text-2xl md:text-4xl text-center md:text-left leading-none">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className=" p-2 md:p-6">{children}</CardContent>
        </Card>
      </FadeInAnimation>
    </TabsContent>
  );
};

export default TabContainer;
