"use client";
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

import { usePantryStore } from "../stores/pantry.store";

export function AddPantryItemForm() {
  const addPantryItem = usePantryStore((s) => s.addPantryItem);
  const router = useRouter();

  const form = useForm<AddPantryItemDto>({
    resolver: zodResolver(AddPantryItemSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      unit: "",
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
      </FieldGroup>
    </form>
  );
}
