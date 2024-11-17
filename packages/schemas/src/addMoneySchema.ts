import { z } from 'zod';

export const addMoneySchema = z.object({
    amount: z.number().positive(),
    provider: z.string().min(1, { message: 'Please select a bank' }),
});
