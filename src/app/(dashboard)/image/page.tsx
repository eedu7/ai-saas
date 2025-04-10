"use client";

import React, { useState } from "react";
import { DownloadIcon, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/Loader";
import { amountOptions, formSchema, resolutionOptions } from "@/app/(dashboard)/image/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModel } from "@/hooks/use-pro-model";

function ImagePage() {
    const router = useRouter();

    const proModal = useProModel();

    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "256x256",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Resetting images
            setImages([]);

            const response = await axios.post("/api/image", values);

            // TODO: Add types
            // @ts-ignore
            const url = response.data.map((image: { url: string }) => image.url);
            // const url = response.data.map((image) => image.url);

            setImages(url);

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
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A picture of a horse in Swiss alps."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="amount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map(({ value, label }) => (
                                                    <SelectItem
                                                        value={value}
                                                        key={value}
                                                    >
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="resolution"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map(({ value, label }) => (
                                                    <SelectItem
                                                        value={value}
                                                        key={value}
                                                    >
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                            <div className="p-20">
                                <Loader />
                            </div>
                        )}
                        {images.length === 0 && !isLoading && (
                            <Empty
                                imageSrc="/image.svg"
                                label="No images generated"
                            />
                        )}
                        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {images.map((src) => (
                                <Card
                                    key={src}
                                    className="overflow-hidden rounded-lg"
                                >
                                    <div className="relative aspect-square">
                                        <Image
                                            src={src}
                                            alt="Image"
                                            fill
                                        />
                                    </div>
                                    <CardFooter className="p-2">
                                        <Button
                                            onClick={() => window.open(src)}
                                            variant="secondary"
                                            className="w-full cursor-pointer"
                                        >
                                            <DownloadIcon className="mr-2 size-4" />
                                            Download
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;
