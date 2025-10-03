import z from "zod";

const mealFilterSchema = z.object({
    dateTime: z.coerce.date(),
});

type MealFilterSchema = z.infer<typeof mealFilterSchema>;

const mealFilterDefaultValues: MealFilterSchema = {
    dateTime: new Date(),
}

export { mealFilterSchema, mealFilterDefaultValues, type MealFilterSchema };