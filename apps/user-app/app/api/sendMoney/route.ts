// pages/api/sendMoney.js

import { z } from 'zod';
import { NextResponse } from 'next/server';
import db from '@repo/db'; // Your database operations
import { createOnRampTransaction } from '../../../lib/actions/createOnRampTranx';

const sendMoneySchema = z.object({
    amount: z.number().positive(),
    provider: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = sendMoneySchema.parse(body);
        const trnx = await createOnRampTransaction(parsedData.provider, parsedData.amount);
        console.log('trnx: ', trnx);

        return NextResponse.json({ status: true, message: 'Transaction completed' });
    } catch (error) {
        console.log('error: ', error);
        return Response.json(
            {
                success: false,
                message: 'Error sending money :(',
            },
            { status: 500 }
        );
    }
}
