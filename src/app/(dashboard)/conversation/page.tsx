import React from "react";
import { Heading } from "@/components/heading";
import { MessageSquareIcon } from "lucide-react";

function ConversationPage() {
    return (
        <div>
            <Heading
                title="Conversation"
                description="Our most advance conversation model"
                icon={MessageSquareIcon}
                iconColor="text-violet-500"
                bgColor="text-violet-500/10"
            />
            <div className="px-4 lg:px-8"></div>
        </div>
    );
}

export default ConversationPage;
