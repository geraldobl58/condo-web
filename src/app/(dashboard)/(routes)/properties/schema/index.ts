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
  bathroomId: z.string().min(1),
  bedroomId: z.string().min(1),
  garage: z.coerce.number(),
  land: z.coerce.number(),
  isFeatured: z.boolean().default(false).optional(),
});
