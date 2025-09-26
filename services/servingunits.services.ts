'use server'
import { executeAction } from "@/lib/executeAction";
import db from "@/lib/prisma";
import { ServingUnitSchema } from "@/types/schema/servingUnitSchema";

// CREATE
const createServingUnit = async (data: ServingUnitSchema) => {
    await executeAction({
        actionFn: () => db.servingUnit.create({ 
            data: { 
                name: data.name 
            }
        }),
    })
}
// READ
const getServingUnits = async () => {
    return await db.servingUnit.findMany();
}
// READ - LIST
const getServingUnit = async (id: number): Promise<ServingUnitSchema> => {
    const response = await db.servingUnit.findFirst({
        where: { id },
    });
    return {
        action: "update",
        name: response?.name ?? "",
        id,
    };
}

// UPDATE
const updateServingUnit = async (data: ServingUnitSchema) => {
    if (data.action === "update") {
        await executeAction({
            actionFn: () => db.servingUnit.update({
                where: { id: data.id },
                data: {
                    name: data.name
                }
            })
        })
    }
}
// DELETE
const deleteServingUnit = async (id: number) => {
    await executeAction({
        actionFn: () => db.servingUnit.delete({
            where: { id }
        })
    })
}

export {
    createServingUnit,
    getServingUnits,
    getServingUnit,
    updateServingUnit,
    deleteServingUnit
}