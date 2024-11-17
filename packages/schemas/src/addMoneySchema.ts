import { z } from 'zod';

export const addMoneySchema = z.object({
    amount: z.number().positive(),
    provider: z.string({ required_error: 'Please select your provider.' }),
});
