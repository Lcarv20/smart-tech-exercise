import { z } from "zod";

// ZOD SCHEMAS
export const nameSchema = z.string().nonempty().min(3);
export const mailSchema = z.string().nonempty().email();
