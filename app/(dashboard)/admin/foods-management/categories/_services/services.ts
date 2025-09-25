'use server'

import { executeAction } from "@/lib/executeAction";
import db from "@/lib/prisma"

export async function getCategories() {
    return await db.category.findMany();
}

export async function deleteCategory(id: number) {
    await executeAction({
        actionFn: () => db.category.delete({
            where: { id }
        })
    })
}