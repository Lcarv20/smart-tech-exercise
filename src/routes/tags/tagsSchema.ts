import { z } from "zod";

export const tagSchema = z.string().nonempty().max(10)