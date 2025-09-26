import React from 'react'
import { Button } from "@/components/ui/button";
import { CircleOff } from "lucide-react";

type NoItemsFoundProps = {
    heading?: string;
    subheading?: string;
    onClick?: () => void;
}

const NoItemsFound = ({ onClick, heading, subheading }: NoItemsFoundProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <CircleOff className="text-primary mb-2" />
            <h3 className="text-lg font-medium">{heading}</h3>
            <p className="text-foreground/60 mt-1 text-sm">{subheading}</p>
            <Button variant="outline" className="mt-4" onClick={onClick}>
                Add new item
            </Button>
        </div>
    );
}

export default NoItemsFound