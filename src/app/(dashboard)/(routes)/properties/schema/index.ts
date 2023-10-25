import * as z from "zod";

export const formShema = z.object({
  name: z.string().min(10),
  images: z.object({ url: z.string() }).array().min(1),
  categoryId: z.string().min(1),
  address: z.string().min(5),
  neighborhood: z.string().min(10),
  price: z.coerce.number(),
  description: z.string().min(10),
  type: z.string().min(5),
  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  garage: z.coerce.number(),
  land: z.coerce.number(),
  isFeatured: z.boolean().default(false).optional(),
});
