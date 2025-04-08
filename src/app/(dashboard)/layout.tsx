import React from "react";
import { Navbar } from "@/components/navbar";
import { DocumentSidebar } from "@/components/document-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    // NOTE: A simple way to fix hydration error
    // const [isMounted, setIsMounted] = React.useState<boolean>(false);
    //
    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);
    //
    // if (!isMounted) {
    //     return null;
    // }

    const apiLimitCount = await getApiLimitCount();

    // TODO: Just like docs projects, do the same here, clerk
    return (
        <div className="relative h-full">
            <div className="z-[80] hidden h-full bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
                <DocumentSidebar apiLimitCount={apiLimitCount} />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
}
