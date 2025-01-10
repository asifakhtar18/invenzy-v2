import { z } from "zod";

export const inventorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  status: z.enum(["active", "inactive"]),
});
