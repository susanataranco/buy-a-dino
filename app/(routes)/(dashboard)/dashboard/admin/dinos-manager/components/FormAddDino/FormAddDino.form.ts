import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2).max(50),
    species: z.string().min(2).max(50),
    photo: z.string().min(2).max(100),
    price: z.string().min(2).max(50),
    description: z.string().min(2).max(120),
    length: z.string().min(2).max(50),
    height: z.string().min(2).max(50),
    period: z.string().min(2).max(50),
    foundIn: z.string().min(2).max(50),
    isPublished: z.boolean(),
})