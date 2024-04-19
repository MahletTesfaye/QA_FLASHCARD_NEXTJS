import client from '@/lib/appwrite';
import { Databases, ID, Query } from 'appwrite';
import { NextResponse } from 'next/server';

const database = new Databases(client);

export async function GET() {
    try {
        const response = await database.listDocuments(process.env.NEXT_APPWRITE_DATABASE_ID as string, process.env.NEXT_APPWRITE_COLLECTION_ID as string, [Query.orderDesc("$createdAt")]);
        return NextResponse.json(response.documents);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get cards' }, { status: 500 });
    }
}
