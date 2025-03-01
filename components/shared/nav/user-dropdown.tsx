"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, Headphones, UserIcon } from "lucide-react";
import { DashboardIcon, ExitIcon } from "@radix-ui/react-icons";
import { useUser, useClerk } from "@clerk/nextjs";

export default function UserDropDown() {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();

    const LoginButton = () => (
        <Button asChild variant="link">
            <Link href="/auth/sign-in">Sign In</Link>
        </Button>
    );

    if (!isLoaded) {
        return <LoginButton />;
    }

    if (!isSignedIn || !user) {
        return <LoginButton />;
    }

    const handleLogout = () => signOut();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.fullName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.primaryEmailAddress?.emailAddress}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.publicMetadata.role === "admin" && (
                    <Link href="/admin">
                        <DropdownMenuItem>
                            <UserIcon className="mr-2 size-4" aria-hidden="true" />
                            AdminPanel

                        </DropdownMenuItem>
                    </Link>
                )}
                <Link href="/dashboard">
                    <DropdownMenuItem>
                        <DashboardIcon className="mr-2 size-4" aria-hidden="true" />
                        Dashboard

                    </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/conversation">
                    <DropdownMenuItem>
                        <Headphones className="mr-2 size-4" aria-hidden="true" />
                        Contact to staff

                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <ExitIcon className="mr-2 size-4" aria-hidden="true" />
                    Logout

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
