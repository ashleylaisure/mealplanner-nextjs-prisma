'use client';

import { useCreateCategory, useUpdateCategory } from '@/services/mutations/categories.mutations';
import { useCategory } from '@/services/queries/categories.queries';
import useCategoriesStore from '@/lib/state/useCategoriesStore';
import { categoryDefaultValues, categorySchema, CategorySchema } from '@/types/schema/categorySchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import ControlledInput from './element/FormInput';
import { useEffect } from 'react';

type CategoryFormProps = {
    smallTrigger?: boolean;
}

const CategoryForm = ({ smallTrigger }: CategoryFormProps) => {

    const form = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: categoryDefaultValues,
    });

    const {
        selectedCategoryId,
        updateSelectedCategoryId,
        categoryDialogOpen,
        updateCategoryDialogOpen,
    } = useCategoriesStore();

    const categoryQuery = useCategory();
    const createCategoryMutation = useCreateCategory();
    const updateCategoryMutation = useUpdateCategory();

    useEffect(() => {
        if (!!selectedCategoryId && categoryQuery.data) {
            form.reset(categoryQuery.data);
        }
    }, [categoryQuery.data, form, selectedCategoryId]);

    const isPending =
        createCategoryMutation.isPending || updateCategoryMutation.isPending;

    const handleDialogOpenChange = (isOpen: boolean) => {
        updateCategoryDialogOpen(isOpen);
        if (!isOpen) {
            updateSelectedCategoryId(null);
            form.reset(categoryDefaultValues);
        }
    }

    const handleSuccess = () => {
        handleDialogOpenChange(false);
    }

    const onSubmit: SubmitHandler<CategorySchema> = (data) => {
        if (data.action === "create") {
            createCategoryMutation.mutate(data, {
                onSuccess: handleSuccess,
            });
        } else {
            updateCategoryMutation.mutate(data, {
                onSuccess: handleSuccess,
            });
        }
    }

    return (
        <Dialog open={categoryDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
                {smallTrigger ? (
                    <Button size="icon" variant="ghost" type="button">
                        <Plus />
                    </Button>
                ) : (
                    <Button type="button">
                        <Plus className="mr-2" />
                        {selectedCategoryId ? "Edit Category" : "Add Category"}
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {selectedCategoryId ? "Edit Category" : "Create a New Category"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormProvider {...form}>
                        
                        <ControlledInput<CategorySchema>
                            name="name"
                            label="Name"
                            placeholder="e.g. Produce"
                        />
                    </FormProvider>
                    <DialogFooter>
                        <Button
                            type="submit"
                            isLoading={isPending}
                        >
                            {!!selectedCategoryId ? "Update" : "Create"} Category
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default CategoryForm