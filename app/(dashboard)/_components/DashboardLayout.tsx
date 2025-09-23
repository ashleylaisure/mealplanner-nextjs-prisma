'use client'
import { Button } from '@/components/ui/button'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronLeft, Menu } from 'lucide-react'
import React, { ReactNode, useState } from 'react'

const DashboardLayout = ({children}: {children: ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex">
            <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
                <Collapsible.Trigger asChild>
                    <Button size="icon" variant="outline">
                        <Menu />
                    </Button>
                </Collapsible.Trigger>
            </Collapsible.Root>

            <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
                <Collapsible.Content>
                    <div className="bg-background fixed top-0 left-0 h-screen w-64 border p-4">
                        <div className="flex items-center justify-center">
                            <h1 className="font-semibold">Admin Dashboard</h1>

                            <Collapsible.Trigger asChild>
                                <Button size="icon" variant="outline">
                                    <ChevronLeft />
                                </Button>
                            </Collapsible.Trigger>
                        </div>
                    </div>
                </Collapsible.Content>
            </Collapsible.Root>
            
            {children}

        </div>
    )
}

export default DashboardLayout