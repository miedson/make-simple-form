import { Button, Field, FileUpload } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import type { DynamicProps } from "../../types/dynamic-props";

export function FileUploadElement({ label, placeholder, preview, required }: DynamicProps) {
    return (
        <Field.Root disabled={preview} required={required}>
            <Field.Label>
                {label}
                <Field.RequiredIndicator />
            </Field.Label>
            <FileUpload.Root accept={["image/png"]}>
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <HiUpload /> {placeholder}
                    </Button>
                </FileUpload.Trigger>
                <FileUpload.List />
            </FileUpload.Root>
        </Field.Root>
    )
}