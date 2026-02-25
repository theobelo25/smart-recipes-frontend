import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui/select";

import { IngredientCategory } from "../types";

export default function IngredientCategorySelect({
  value,
  onValueChange,
}: {
  value?: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(IngredientCategory).map((value) => (
            <SelectItem key={value} value={value}>
              {value.charAt(0).toLocaleUpperCase() + value.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
