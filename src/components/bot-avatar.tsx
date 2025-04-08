import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
    return (
        <Avatar className="size-8">
            <AvatarImage
                className="p-1"
                src="/icon/logo.svg"
            />
        </Avatar>
    );
};
