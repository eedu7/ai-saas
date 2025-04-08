"use client";

import React from "react";
import { MessageSquareIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { formSchema } from "@/app/(dashboard)/conversation/constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Empty } from "@/components/empty";
import { ChatCompletionMessage } from "openai/resources/chat/completions";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { useProModel } from "@/hooks/use-pro-model";

function ConversationPage() {
    const router = useRouter();

    const proModal = useProModel();

    const [messages, setMessages] = React.useState<ChatCompletionMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage = {
                role: "user",
                content: values.prompt,
            };

            const newMessages = [...messages, userMessage];

            const response = await axios.post<ChatCompletionMessage>("/api/conversation", {
                messages: newMessages,
            });

            // @ts-ignore
            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            }
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Conversation"
                description="Our most advance conversation model"
                icon={MessageSquareIcon}
                iconColor="text-violet-500"
                bgColor="text-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="How do calculate the radius of a circle?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 w-full cursor-pointer lg:col-span-2"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 space-y-4">
                        {isLoading && (
                            <div className="bg-muted flex w-full items-center justify-center rounded-lg p-8">
                                <Loader />
                            </div>
                        )}
                        {messages.length === 0 && !isLoading && (
                            <Empty
                                imageSrc="/empty.svg"
                                label="No conversation started"
                            />
                        )}
                        <div className="flex flex-col-reverse gap-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.content}
                                    className={cn(
                                        "flex w-full flex-row items-start gap-x-8 rounded-lg p-8",
                                        message.role === "assistant" ? "bg-muted" : "border border-black/10 bg-white",
                                    )}
                                >
                                    {/* TODO: Make it in the Markdown */}
                                    {message.role === "assistant" ? <BotAvatar /> : <UserAvatar />}
                                    <p className="text-sm">{message.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;
