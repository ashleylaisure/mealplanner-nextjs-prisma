'use client'

import useMealsStore from '@/lib/state/useMealStore'
import { useCreateMeal, useMeal, useUpdatemeal } from '@/services/actions/meal.actions'
import { mealDefaultValues, mealSchema, MealSchema } from '@/types/schema/mealSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import DatePicker from './controlled/DatePicker'
import SelectMealFoods from './controlled/SelectMealFoods'



const MealForm = ({ smallTrigger }: { smallTrigger?: boolean }) => {

    const form = useForm<MealSchema>({
        defaultValues: mealDefaultValues,
        resolver: zodResolver(mealSchema),
    });

    const userId = useWatch({ control: form.control, name: "userId" });
    // const userId = "1";

    const {
      selectedMealId,
      updateSelectedMealId,
      mealDialogOpen,
      updateMealDialogOpen,
    } = useMealsStore()

    const mealQuery = useMeal();
    const createMealMutation = useCreateMeal();
    const updateMealMutation = useUpdatemeal();

    useEffect(() => {
      if (!!selectedMealId && mealQuery.data) {
        form.reset(mealQuery.data);
      }
    }, [selectedMealId, mealQuery.data, form]);

    useEffect(() => {
      if (!userId) {
        form.setValue("userId", "1");
      }
    }, [form, userId]);

    // useEffect(() => {
    //   if (!userId && session?.user?.id) {
    //     form.setValue("userId", session.user.id);
    //   }
    // }, [form, session?.user?.id, userId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateMealDialogOpen(open);

    if (!open) {
      updateSelectedMealId(null);
      form.reset(mealDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<MealSchema> = (data) => {
    if (data.action === "create") {
      createMealMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateMealMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  const isPending =
    createMealMutation.isPending || updateMealMutation.isPending;

  return (
    <Dialog open={mealDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {smallTrigger ? (
          <Button size="icon" variant="ghost" type="button">
            <Plus />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2" />
            New Meal
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedMealId ? "Edit Meal" : "Create a New Meal"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <SelectMealFoods />
              </div>
              <div className="col-span-2">
                <DatePicker<MealSchema> name="dateTime" />
              </div>

              {Object.keys(form.formState.errors).length > 0 && (
                <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
              )}
            </div>
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {!!selectedMealId ? "Edit" : "Create"} Meal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default MealForm