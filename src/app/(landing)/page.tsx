import React from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function LandingPage() {
    return (
        <div>
            Landing Page (Unprotected)
            <div>
                <Button asChild>
                    <SignInButton />
                </Button>
                <Button asChild>
                    <SignUpButton />
                </Button>
            </div>
        </div>
    );
}

export default LandingPage;
