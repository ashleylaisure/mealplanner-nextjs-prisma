'use server'
import { executeAction } from "@/lib/executeAction";
import db from "@/lib/prisma";
import { toNumberSafe, toStringSafe } from "@/lib/utils";
import { mealFilterSchema, MealFilterSchema } from "@/types/schema/mealFilterSchema";
import { mealSchema, MealSchema } from "@/types/schema/mealSchema";
import { Prisma } from "@prisma/client";

const getMeals = async (filters: MealFilterSchema) => {
    const validatedFilters = mealFilterSchema.parse(filters);
    // const session = await auth()
    const {dateTime} = validatedFilters || {};

    const where : Prisma.MealWhereInput = {};

    if (dateTime !== undefined) {
        const startDate = new Date(dateTime);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(dateTime);
        endDate.setHours(23, 59, 59, 999);
        where.dateTime = {
            gte: startDate,
            lte: endDate,
        };
    }

    // if (session?.user?.id) {
    //     where.userId = { equals: +session.user.id };
    // }

    const data = await db.meal.findMany({
        where,
        orderBy: { dateTime: 'desc' },
        include: {
            mealFoods: {
                include: {
                    food: true,
                    servingUnit: true,
                }
            }
        }
    })
    return data;
}

const getMeal = async (id: number) => {
    const res = await db.meal.findFirst({
        where: { id },
        include: {
            mealFoods: true,
        }
    })
    
    if (!res) return null;

    return {
        action: "update",
        id,
        dateTime: res.dateTime,
        userId: toStringSafe(res.userId),
        mealFoods:
            res.mealFoods.map((item) => ({
                foodId: toStringSafe(item.foodId),
                servingUnitId: toStringSafe(item.servingUnitId),
                amount: item.amount,
            })) ?? [],
    }
}

const createMeal = async (data: MealSchema) => {
    await executeAction({
        actionFn: async () => {
            const validatedData = mealSchema.parse(data);

            const meal = await db.meal.create({
                data: {
                    userId: toNumberSafe(validatedData.userId),
                    dateTime: validatedData.dateTime,
                }
            })

            await Promise.all(
                validatedData.mealFoods.map( async (food) => {
                    await db.mealFood.create({
                        data: {
                            mealId: meal.id,
                            foodId: toNumberSafe(food.foodId),
                            servingUnitId: toNumberSafe(food.servingUnitId),
                            amount: toNumberSafe(food.amount),
                        }
                    })
                })
            )
        }
    })
}

const updateMeal = async (data: MealSchema) => {
    await executeAction({
        actionFn: async () => {
            const validatedData = mealSchema.parse(data);
            if (validatedData.action === "update") {
                await db.meal.update({
                    where: { id: validatedData.id },
                    data: {
                        dateTime: validatedData.dateTime,
                    }
                });

                await db.mealFood.deleteMany({
                    where: { mealId: validatedData.id }
                });

                await Promise.all(
                    validatedData.mealFoods.map( async (food) => {
                        await db.mealFood.create({
                            data: {
                                mealId: validatedData.id,
                                foodId: toNumberSafe(food.foodId),
                                servingUnitId: toNumberSafe(food.servingUnitId),
                                amount: toNumberSafe(food.amount),
                            }
                        })
                    })

                )
            }
        }
    })
}

const deleteMeal = async (id: number) => {
    await executeAction({
        actionFn: async () => {
            await db.mealFood.deleteMany({
                where: { mealId: id }
            });
            await db.meal.delete({
                where: { id }
            });
        }
    })
}

export {
    getMeals,
    getMeal,
    createMeal,
    updateMeal,
    deleteMeal,
}