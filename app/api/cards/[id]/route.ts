import client from '@/lib/appwrite';
import { Databases } from 'appwrite';
import { NextResponse } from 'next/server';

const database = new Databases(client);

const getSpecificCard = async (id: string) => {
    try {
        const response = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, id);
        return response
    } catch (error) {
        console.error("Error getting card", error);
        throw new Error("Failed to fetch card");
    }
}

async function deleteCard(id: string) {
    try {
        const response = await database.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, id);
        return response;
    } catch (error) {
        console.error("Error deleting card", error);
        throw new Error("Failed to delete card");
    }
}

async function updateCard(id: string, data: { question: string, answer: string }) {
    try {
        const response = await database.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, id, data);
        return response;
    } catch (error) {
        console.error("Error updating card", error);
        throw new Error("Failed to update card");
    }
}

export async function GET(req: Request, { params }) {
    try {
        const { id } = params;
        const response = await getSpecificCard(id);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get card' }, { status: 500 });
    }
}
export async function DELETE(req: Request, { params }) {
    try {
        const { id } = params;
        await deleteCard(id);
        return NextResponse.json({ message: 'Card deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }) {
    try {
        const { id } = params;
        const cards = await req.json()
        await updateCard(id, cards)
        return NextResponse.json({message: "Card updated"})
    } catch (error) {
        return NextResponse.json({error: "Failed to update card"}, {status:500})
    }
}
