import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative h-full">
            <aside className="z-[80] hidden h-full bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
                <div>Hello, Sidebar!</div>
            </aside>
            <main className="md:pl-72">{children}</main>
        </div>
    );
}
