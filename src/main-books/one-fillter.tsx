import { Checkbox } from "@/components/ui/checkbox";

interface Props{
    name: string;
    id: string;
    category: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export const OneFillter = ({name, id, category, checked, onCheckedChange}:Props) => {
    return(
        <div>
            <Checkbox
                id={`checkbox-${name}-${id}-${category}`}
                value={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
            />
            <label className="cursor-pointer" htmlFor={`checkbox-${name}-${id}-${category}`}>
                {name}
            </label>
        </div>
    )
}