import { patterns } from "@/lib/constants";
import z from "zod";

const foodFilterSchema = z.object({
    searchTerm: z.string(),
    caloriesRange: z.tuple([
        z.string().regex(patterns.zeroTo9999),
        z.string().regex(patterns.zeroTo9999),
    ]),
    proteinRange: z.tuple([
        z.string().regex(patterns.zeroTo9999),
        z.string().regex(patterns.zeroTo9999),
    ]),
    categoryId: z.string(),
    sortBy: z.enum(["name", "calories", "protein", "carbohydrate", "fat"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    page: z.number(),
    pageSize: z.number().max(100)
});

type FoodFilterSchema = z.infer<typeof foodFilterSchema>;

const foodFilterDefaultValues: FoodFilterSchema = {
    searchTerm: "",
    caloriesRange: ["0", "9999"],
    proteinRange: ["0", "9999"],
    categoryId: "",
    sortBy: "name",
    sortOrder: "desc",
    pageSize: 12,
    page: 1,
}

export { foodFilterSchema, type FoodFilterSchema, foodFilterDefaultValues };