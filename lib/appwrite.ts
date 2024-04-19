import { Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_APPWRITE_PROJECT_ID as string);

export default client;