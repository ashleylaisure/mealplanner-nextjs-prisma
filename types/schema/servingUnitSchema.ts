import z from "zod";

const servingUnitSchema = z.intersection(
    z.object({
        name: z.string().trim().min(1, "Serving unit name is required").max(255, "Serving unit name is too long"),
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
)

type ServingUnitSchema = z.infer<typeof servingUnitSchema>;

const servingUnitDefaultValues: ServingUnitSchema = {
    action: "create",
    name: "",
};

export { servingUnitSchema, servingUnitDefaultValues, type ServingUnitSchema };