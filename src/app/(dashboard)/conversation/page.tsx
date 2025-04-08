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

function ConversationPage() {
    const router = useRouter();

    const [messages, setMessages] = React.useState([]);

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

            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            });

            // @ts-ignore
            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            // TODO: Open Pro model
            console.error(error);
        } finally {
            router.refresh();
        }
    };

    // @ts-ignore
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
                            onClick={form.handleSubmit(onSubmit)}
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
                                className="col-span-12 w-full lg:col-span-2"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 space-y-4">
                        <div className="flex flex-col-reverse gap-y-4">
                            {messages.map((message) => (
                                <div key={message.content}>{message.content}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;
