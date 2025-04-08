"use client";

import React, { useState } from "react";
import { ImageIcon } from "lucide-react";
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
import { Loader } from "@/components/Loader";

function ImagePage() {
    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/image", {});

            form.reset();
        } catch (error: any) {
            // TODO: Open Pro model
            console.error(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Image Generation"
                description="Turn your prompt into an image."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="text-pink-700/10"
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
                        {isLoading && (
                            <div className="bg-muted flex w-full items-center justify-center rounded-lg p-8">
                                <Loader />
                            </div>
                        )}
                        {images.length === 0 && !isLoading && (
                            <Empty
                                imageSrc="/image.svg"
                                label="No images generated"
                            />
                        )}
                        <div>Images will be rendered here</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;
