"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "./ui/sonner";
import AlertDialogProvider from "./AlertDialogProvider";


export default function Providers({ children }: { children: ReactNode }) {

    return (
        <QueryClientProvider client={new QueryClient()}   >

            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Toaster />
                <AlertDialogProvider />
                {children}
            </NextThemesProvider>

        </QueryClientProvider>
    );
};
