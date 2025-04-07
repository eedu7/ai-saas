import React from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function LandingPage() {
    return (
        <div>
            Landing Page (Unprotected)
            <div>
                <Button
                    asChild
                    className="cursor-pointer"
                >
                    <SignInButton />
                </Button>
                <Button
                    asChild
                    className="cursor-pointer"
                >
                    <SignUpButton />
                </Button>
            </div>
        </div>
    );
}

export default LandingPage;
