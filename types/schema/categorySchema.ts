import z from "zod";

const categorySchema = z.intersection(
    z.object({
        name: z.string().trim().min(1, "Name is required").max(255, "Name must be less than 255 characters"),
    }),

    z.discriminatedUnion("action", [
        z.object({
            action: z.literal("create"),
        }),
        z.object({
            action: z.literal("update"),
            id: z.number().min(1, "Id is required"),
        }),
    ]),
);

type CategorySchema = z.infer<typeof categorySchema>;

const categoryDefaultValues: CategorySchema = {
    action: "create",
    name: "",
};

export { categorySchema, categoryDefaultValues, type CategorySchema };