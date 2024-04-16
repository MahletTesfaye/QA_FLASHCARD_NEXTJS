import client from '@/lib/appwrite';
import { Databases, ID, Query } from 'appwrite';
import { NextResponse } from 'next/server';

const database = new Databases(client);

// create a new card
async function createCards(data: { question: string, answer: string }) {
    try {
        const response = await database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, ID.unique(), data);
        return response;
    } catch (error) {
        console.error("Error creating card",error);
        throw new Error("Failed to create card");
    }
}
// get all cards
async function getCards() {
    try {
        const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, [Query.orderDesc("$createdAt")]);
        return response.documents;
    } catch (error) {
        console.error("Error getting cards",error);
        throw new Error("Failed to fetch cards");
    }
}

export async function POST(req: Request) {
    try {
        const { question, answer } = await req.json();
        const data = { question, answer };
        const response = await createCards(data);
        return NextResponse.json({ message: 'Card created successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create cards' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const response = await getCards();
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get cards' }, { status: 500 });
    }
}
