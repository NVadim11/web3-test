import { Button as SharedButton } from "@heroui/react";
import type { ButtonProps } from '@heroui/react'

export default function Button({ children, color = "primary", ...props }: ButtonProps) {
    return <SharedButton color={color} {...props}>{children}</SharedButton>;
}