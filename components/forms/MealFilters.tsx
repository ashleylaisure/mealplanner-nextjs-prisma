"use client";

import { Button } from "@/components/ui/button";
import useMealsStore from "@/lib/state/useMealStore";

import { mealFilterDefaultValues, mealFilterSchema, MealFilterSchema } from "@/types/schema/mealFilterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "./controlled/DatePicker";

const MealFilters = () => {
  const form = useForm<MealFilterSchema>({
    defaultValues: mealFilterDefaultValues,
    resolver: zodResolver(mealFilterSchema),
  });

  const { updateMealFilters } = useMealsStore();

  const onSubmit: SubmitHandler<MealFilterSchema> = (data) => {
    updateMealFilters(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-4 flex items-center gap-3"
      >
        <DatePicker<MealFilterSchema>
          name="dateTime"
          label="Filter by date"
        />
        <Button type="submit" size="sm">
          Apply
        </Button>

        {Object.keys(form.formState.errors).length > 0 && (
  <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
)}
      </form>
    </FormProvider>
  );
};

export { MealFilters };