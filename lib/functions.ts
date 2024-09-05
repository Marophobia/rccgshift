import { NextResponse } from 'next/server';

export const sucessHandler = (message: string, code: number = 200, data: any = {}) => {
    return NextResponse.json({ message, data, }, { status: code });
};

export const errorHandler = (message: string, code: number = 500) => {
    return NextResponse.json({ error: message, }, { status: code });
};
