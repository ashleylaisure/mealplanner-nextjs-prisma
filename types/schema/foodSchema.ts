import { patterns } from "@/lib/constants";
import { regexSchema, requiredStringSchema } from "@/lib/zodSchemas";
import z from "zod";


const foodSchema = z.intersection(
    z.object({
        name: z.string().trim().min(1, "Name is required").max(255, "Name must be less than 255 characters"),
        calories: regexSchema(patterns.zeroTo9999),
        protein: regexSchema(patterns.zeroTo9999),
        fat: regexSchema(patterns.zeroTo9999),
        carbohydrate: regexSchema(patterns.zeroTo9999),
        fiber: regexSchema(patterns.zeroTo9999),
        sugar: regexSchema(patterns.zeroTo9999),
        categoryId: requiredStringSchema,
        foodServingUnits: z.array(
            z.object({
                foodServingUnitId: requiredStringSchema,
                grams: regexSchema(patterns.zeroTo9999)
            }),
        ),
    }),
    z.discriminatedUnion("action", [
        z.object({ action: z.literal("create")}),
        z.object({ action: z.literal("update"), id: z.number() })
    ])
)


type FoodSchema = z.infer<typeof foodSchema>;

const foodDefaultValues: FoodSchema = {
    action: "create",
    name: "",
    calories: "",
    protein: "",
    fat: "",
    carbohydrate: "",
    fiber: "",
    sugar: "",
    categoryId: "",
    foodServingUnits: [],
};

export { foodSchema, foodDefaultValues, type FoodSchema };