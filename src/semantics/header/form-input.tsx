import React from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface Props extends React.InputHTMLAttributes<HTMLElement>{
    name: string;
    label?: string;
    required?: boolean;
}

const passwordRules = [
  "Минимум 8 символов",
  "Хотя бы одна заглавная буква (A–Z)",
  "Хотя бы одна строчная буква (a–z)",
  "Хотя бы одна цифра (0–9)",
  "Хотя бы один спецсимвол (!@#$%^&*())",
  "Только английские буквы и разрешённые символы",
];

export const FormInputM = ({name, label, required, ...props}: Props) => {

    const {register, watch, setValue, formState: {errors, isSubmitted}} = useFormContext();

    const text = watch(name);

    const errorText = errors?.[name]?.message as string;

    const e = required && isSubmitted && !text;

    const onClickClear = () => {
        setValue(name, '', {shouldValidate: true});
    };

    return(
        <div>

            {label && (
                <p>
                    {label} {e && <span>*</span>}
                </p>
            )}

            <div>
                <Input {...register(name)} {...props}/>
                {Boolean(text) && <button onClick={() => onClickClear()}>x</button>}
            </div>

            {name === "password" && (
                <ul className="text-xs text-gray-500 mt-1">
                    {passwordRules.map((rule, i) => (
                        <li key={i}>• {rule}</li>
                    ))}
                </ul>
            )}

            {errorText && <p>{errorText}</p>}
        </div>
    )
}