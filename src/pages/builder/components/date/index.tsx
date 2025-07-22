import { Field, Input } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import type { DynamicProps } from "../../types/dynamic-props";
import { useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

export function DateElement({ label, name, disabled, preview, required }: DynamicProps) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const formContext = preview ? undefined : useFormContext();
    return (
        <Field.Root disabled={disabled} required={required} invalid={formContext ? !!formContext?.formState.errors[name]?.message : false}>
            <Field.Label>
                {label}
                <Field.RequiredIndicator />
            </Field.Label>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<Input />}
                dateFormat="dd/MM/yyyy"
                disabled={disabled}
            />
        </Field.Root>
    )
}