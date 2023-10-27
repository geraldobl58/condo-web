import * as z from "zod";

export const formShema = z.object({
  name: z.string().min(10),
  images: z.object({ url: z.string() }).array().min(1),
  categoryId: z.string().min(1),
  address: z.string().min(5),
  neighborhood: z.string().min(10),
  price: z.coerce.number(),
  description: z.string().min(10),
  kindId: z.string().min(1),
  bathroomId: z.string().min(1),
  bedroomId: z.string().min(1),
  garageId: z.string().min(1),
  land: z.coerce.number(),
  isFeatured: z.boolean().default(false).optional(),
});
