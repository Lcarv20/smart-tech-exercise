import { z } from "zod";

const titleSchema = z.string().nonempty().min(3).max(20);
const descriptionSchema = z.string().nonempty().max(100);
const postDateSchema = z.string().datetime().nonempty();

export { titleSchema, descriptionSchema, postDateSchema };