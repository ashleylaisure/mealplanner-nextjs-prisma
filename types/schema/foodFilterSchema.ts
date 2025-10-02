import { patterns } from "@/lib/constants";
import { regexSchema } from "@/lib/zodSchemas";
import z from "zod";

const foodFilterSchema = z.object({
    searchTerm: z.string(),
    caloriesRange: z.tuple([
        regexSchema(patterns.zeroTo9999),
        regexSchema(patterns.zeroTo9999),
    ]),
    proteinRange: z.tuple([
        regexSchema(patterns.zeroTo9999),
        regexSchema(patterns.zeroTo9999),
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
    pageSize: 4,
    page: 1,
}

export { foodFilterSchema, type FoodFilterSchema, foodFilterDefaultValues };