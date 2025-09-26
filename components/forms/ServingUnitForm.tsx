'use client'

import useServingUnitsStore from "@/lib/state/useServingUnitsStore"
import { useCreateServingUnit, useUpdateServingUnit } from "@/services/mutations/servingunits.mutations"
import { useServingUnit } from "@/services/queries/servingUnit.queries"
import { servingUnitDefaultValues, servingUnitSchema, ServingUnitSchema } from "@/types/schema/servingUnitSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import ControlledInput from "../ui/controlled/ControlledInput"


const ServingUnitForm = ({smallTrigger}: {smallTrigger? : boolean}) => {

    const form = useForm<ServingUnitSchema>({
        resolver: zodResolver(servingUnitSchema),
        defaultValues: servingUnitDefaultValues,
    });

    const {
        selectedServingUnitId,
        updateSelectedServingUnitId,
        servingUnitDialogOpen,
        updateServingUnitDialogOpen,
    } = useServingUnitsStore();

    const servingUnitQuery = useServingUnit();
    const createServingUnitMutation = useCreateServingUnit();
    const updateServingUnitMutation = useUpdateServingUnit();

    // "Whenever the selected serving unit changes, or new data is fetched for it, 
    // reset the form with the latest serving unit data — 
    // but only if we actually have a selected ID and data available."

    useEffect(() => {
        if(!!selectedServingUnitId && servingUnitQuery.data) {
            form.reset(servingUnitQuery.data);
        }
    }, [servingUnitQuery.data, form, selectedServingUnitId] )

    const handleDialogOpenChange = (isOpen: boolean) => {
        updateServingUnitDialogOpen(isOpen)

        if (!isOpen) {
            updateSelectedServingUnitId(null)
            form.reset(servingUnitDefaultValues)
        }
    }

    const handleSuccess = () => {
        handleDialogOpenChange(false)
    }

    const onSubmit: SubmitHandler<ServingUnitSchema> = (data) => {
        if (data.action === 'create') {
            createServingUnitMutation.mutate(data, {onSuccess: handleSuccess})
        } else {
            updateServingUnitMutation.mutate(data, {onSuccess: handleSuccess})
        }
    }

    const isPending = 
        createServingUnitMutation.isPending || updateServingUnitMutation.isPending

    return (
        <Dialog open={servingUnitDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
                {smallTrigger? (
                    <Button size="icon" variant="ghost" type="button">
                        <Plus />
                    </Button>
                ): (
                    <Button>
                        <Plus className="mr-2" />
                        New Serving Unit
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {selectedServingUnitId
                            ? "Edit Serving Unit"
                            : "Create a New Serving Unit"
                        }
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormProvider {...form}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <ControlledInput<ServingUnitSchema>
                                    name="name"
                                    label="Name"
                                    placeholder="Enter serving unit name"
                                />
                            </div>
                        </div>
                    </FormProvider>

                    <DialogFooter>
                        <Button type="submit" isLoading={isPending}>
                            {!!selectedServingUnitId ? "Edit" : "Create"} Serving Unit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default ServingUnitForm