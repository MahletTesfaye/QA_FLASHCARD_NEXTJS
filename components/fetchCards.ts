import client from '@/lib/appwrite';
import { Databases, Query } from 'appwrite';
const database = new Databases(client);

export async function fetchCards() {
  try {
    const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, [
      Query.orderDesc("$createdAt"),
      Query.select(["question", "answer", "category"])
    ]);
    return response.documents;
  } catch (error) {
    throw new Error("Failed to get cards");
  }
}

export async function fetchDataWithCategory(category: string) {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      [
        Query.orderDesc("$createdAt"),
        Query.equal("category", category),
      ]
    );

    return response.documents
  } catch (error) {
    throw new Error(`Failed to get cards`);
  }
}
export async function fetchCategory() {
  try {
    const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, [
      Query.orderDesc("$createdAt"),
      Query.select(["category"]),
    ]);
    const categories = response.documents.map(document => document.category);
    const uniqueCategoriesSet = new Set(categories);
    const uniqueCategories = Array.from(uniqueCategoriesSet);

    return uniqueCategories;
  } catch (error) {
    throw new Error("Failed to get cards");
  }
}

