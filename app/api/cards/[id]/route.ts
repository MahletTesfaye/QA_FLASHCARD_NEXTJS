import client from '@/lib/appwrite';
import { Databases } from 'appwrite';
import { NextResponse } from 'next/server';

const database = new Databases(client);

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const response = await database.getDocument(process.env.NEXT_APPWRITE_DATABASE_ID as string, process.env.NEXT_APPWRITE_COLLECTION_ID as string, id);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: 'Unable to get card' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        await database.deleteDocument(process.env.NEXT_APPWRITE_DATABASE_ID as string, process.env.NEXT_APPWRITE_COLLECTION_ID as string, id);
        return NextResponse.json({ message: 'Card deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const data = await req.json()
        const response = await database.updateDocument(process.env.NEXT_APPWRITE_DATABASE_ID as string, process.env.NEXT_APPWRITE_COLLECTION_ID as string, id, data);
        return NextResponse.json({ message: "Card updated" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update card" }, { status: 500 })
    }
}
