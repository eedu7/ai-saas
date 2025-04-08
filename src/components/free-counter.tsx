import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ZapIcon } from "lucide-react";

export const FreeCounter = ({ apiLimitCount = 0 }: { apiLimitCount: number }) => {
    const [mounted, setMounted] = React.useState(false);

    return (
        <div className="px-3">
            <Card className="border-0 bg-white/10">
                <CardContent>
                    <div className="mb-4 space-y-2 text-center text-sm text-white">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                        </p>
                        <Progress
                            className="h-3 bg-white"
                            value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                        />
                    </div>
                    <Button
                        variant="premium"
                        className="w-full cursor-pointer"
                    >
                        <span>Upgrade</span>
                        <ZapIcon className="ml-2 size-4 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
