import db from "@/lib/prisma";
import { toStringSafe } from "@/lib/utils";
import { PaginatedResult } from "@/types/globalTypes";
import { foodFilterSchema, FoodFilterSchema } from "@/types/schema/foodFilterSchema";
import { FoodSchema } from "@/types/schema/foodSchema";
import { Prisma } from "@prisma/client";


export type FoodWithServingUnits = Prisma.FoodGetPayload<{
    include: {
        foodServingUnits: true;
        // servingUnits: true;
    };
}>;

// CREATE

// READ - INDEX
const getFoods = async (filters: FoodFilterSchema): Promise<PaginatedResult<FoodWithServingUnits>> => {

    // filters come from the request query
    // they need to be validated and parsed
    // if it succeeds, you get a typed validatedFilters object
    // if it fails, an error is thrown
    const validatedFilters = foodFilterSchema.parse(filters);

    // pulls values out of the validatedFilters object
    // provides default values if they are undefined
    const {
        searchTerm,
        caloriesRange = ["", ""],
        proteinRange = ["", ""],
        categoryId,
        sortBy = "name",
        sortOrder = "asc",
        page = 1,
        pageSize = 10,
    } = validatedFilters || {};

    // build the where clause based on the filters
    const where: Prisma.FoodWhereInput = {};

    // if a search term is provided, add a WHERE name LIKE '%searchTerm%' clause
    if(searchTerm) {
        where.name = { contains: searchTerm };
    }

    // convert range strings to numbers or undefined
    const [minCaloriesStr, maxCaloriesStr] = caloriesRange;
    const numericMinCalories = minCaloriesStr === "" ? undefined : Number(minCaloriesStr);
    const numericMaxCalories = maxCaloriesStr === "" ? undefined : Number(maxCaloriesStr);

    // add to where clause if either min or max is defined
    // to build a range filter for calories
    if (numericMinCalories !== undefined || numericMaxCalories !== undefined) {
        where.calories = {};
        if (numericMinCalories !== undefined) where.calories.gte = numericMinCalories;
        if (numericMaxCalories !== undefined) where.calories.lte = numericMaxCalories;
    }

    // similar logic for protein range
    const [minProteinStr, maxProteinStr] = proteinRange;
    const numericMinProtein = minProteinStr === "" ? undefined : Number(minProteinStr);
    const numericMaxProtein = maxProteinStr === "" ? undefined : Number(maxProteinStr);

    if (numericMinProtein !== undefined || numericMaxProtein !== undefined) {
        where.protein = {};
        if (numericMinProtein !== undefined) where.protein.gte = numericMinProtein;
        if (numericMaxProtein !== undefined) where.protein.lte = numericMaxProtein;
    }

    // if a categoryId is provided and it's not "0" (which means all categories)
    // add a WHERE categoryId = categoryId clause
    // converting the string to a number
    const numericCategoryId = categoryId ? Number(categoryId) : undefined;
    if (numericCategoryId !== undefined && numericCategoryId !== 0) {
        where.category = {
            id: numericCategoryId,
        };
    }

    // calculate how many records to skip based on the page and pageSize
    const skip = (page - 1) * pageSize;

    // run the query to get the total count of matching records
    // and the paginated records for the current page
    const [total, data] = await Promise.all([
        db.food.count({ where }),
        db.food.findMany({
            where,
            orderBy: {[sortBy]: sortOrder},
            skip,
            take: pageSize,
            include: {
                foodServingUnits: true,
                // servingUnits: true,
            },
            // Ensure all required fields are selected
            // If you use 'include', Prisma returns all scalar fields by default,
            // but if you use 'select', you must specify all fields.
        }),
    ]);

    return {
        data,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    }
}

// READ - BY ID
const getFood = async (id: number): Promise<FoodSchema | null> => {
    const res = await db.food.findFirst({
        where: { id },
        include: {
            foodServingUnits: true,
        },
    });

    if (!res) return null;

    return {
        action: "update" as const,
        id: res.id,
        name: toStringSafe(res.name),
        calories: toStringSafe(res.calories),
        carbohydrate: toStringSafe(res.carbohydrate),
        fat: toStringSafe(res.fat),
        fiber: toStringSafe(res.fiber),
        protein: toStringSafe(res.protein),
        sugar: toStringSafe(res.sugar),
        categoryId: toStringSafe(res.categoryId),
        foodServingUnits:
        res.foodServingUnits.map((item) => ({
            foodServingUnitId: toStringSafe(item.servingUnitId),
            grams: toStringSafe(item.grams),
        })) ?? [],
    };
};
// UPDATE
// DELETE

export { getFoods, getFood };
