import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navbar = () => {
    return (
        <nav className="flex items-center p-4">
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
            >
                <Menu />
            </Button>
        </nav>
    );
};
