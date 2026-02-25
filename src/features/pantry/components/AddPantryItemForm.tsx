"use client";
import { Button } from "@/src/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/ui/field";
import { Input } from "@/src/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { AddPantryItemDto, AddPantryItemSchema } from "../types";
import { useAuthStore } from "../../auth";
import { IngredientCategory } from "../../ingredients/types";
import { addPantryItem } from "../api/pantry.api";
import IngredientCategorySelect from "../../ingredients/components/IngredientCategorySelect";
import { Textarea } from "@/src/shared/ui/textarea";
import { usePantryStore } from "../stores/pantry.store";

export function AddPantryItemForm() {
  const addPantryItem = usePantryStore((s) => s.addPantryItem);
  const router = useRouter();

  const form = useForm<AddPantryItemDto>({
    resolver: zodResolver(AddPantryItemSchema),
    defaultValues: {
      name: "",
      category: IngredientCategory.OTHER,
      quantity: 0,
      unit: "",
      notes: "",
    },
  });

  async function onSubmit(data: AddPantryItemDto) {
    try {
      addPantryItem(data);

      router.replace("/pantry");
    } catch {
      console.error("Could not add pantry item.");
    }
  }

  return (
    <form id="add-pantry-item" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Item Name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <IngredientCategorySelect
                value={field.value}
                onValueChange={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="quantity"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
              <Input
                {...field}
                id="quantity"
                type="number"
                step={0.05}
                aria-invalid={fieldState.invalid}
                placeholder="Qty"
                autoComplete="off"
                {...form.register("quantity", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="unit"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="unit">Unit</FieldLabel>
              <Input
                {...field}
                id="unit"
                aria-invalid={fieldState.invalid}
                placeholder="Unit"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="notes"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <Textarea
                {...field}
                id="notes"
                placeholder="Add optional notes..."
                className="min-h-[100px]"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
