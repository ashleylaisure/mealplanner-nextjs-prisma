'use server'
import { executeAction } from "@/lib/executeAction";
import db from "@/lib/prisma"
import { CategorySchema } from "@/types/categorySchema";


export async function getCategories() {
    return await db.category.findMany();
}

export async function getCategory (id: number): Promise<CategorySchema> {
    const response = await db.category.findFirst({
        where: { id },
    })
    return {
        action: "update",
        name: response?.name || "",
        id,
    }
}

export async function deleteCategory(id: number) {
    await executeAction({
        actionFn: () => db.category.delete({
            where: { id }
        })
    })
}

export async function createCategory(data: CategorySchema) {
    await executeAction({
        actionFn: () => db.category.create({
            data: {
                name: data.name
            }
        })
    })
}

export async function updateCategory(data: CategorySchema) {
    if (data.action === "update") {
        await executeAction({
            actionFn: () => db.category.update({
                where: { id: data.id },
                data: {
                    name: data.name
                }
            })
        })
    }
}
