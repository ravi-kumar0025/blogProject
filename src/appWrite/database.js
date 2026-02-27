import conf from "../../const.js"
import { Client, Databases, ID, Storage, Query } from 'appwrite';

export class Service {

    client = new Client();
    databases;
    buket;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client);
        this.buket = new Storage(this.client);
    }

    async createPost({ title, image, content, status, userId }) {
        try {
            return await this.databases.createDocument({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                documentId: ID.unique(),
                data: { title, image, content, status, userId },
            });
        } catch (error) {
            console.log("ERROR TO CREATE POST", error);
        }
    }

    async updatePost(documentId, { title, image, content, status }) {
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                documentId,
                data: { title, image, content, status },
            });
        } catch (error) {
            console.log("ERROR TO UPDATE POST", error);
        }
    }

    async deletePost(documentId) {
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                documentId,
            });
            return true;
        } catch (error) {
            console.log("ERROR TO DELETE POST : : ", error);
            return false;
        }
    }

    async getPost(documentId) {
        try {
            return await this.databases.getDocument({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                documentId,
            });
        } catch (error) {
            console.log("ERROR TO GET THE POST : : ", error);
        }
    }

    async getPosts() {
        const queries = [
            Query.equal('status', 'active'),
        ]
        try {
            return await this.databases.listDocuments({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                queries,
            });
        } catch (error) {
            console.log("ERROR TO GET THE POSTS : : ", error);
        }
    }

    async uploadfile(file) {
        try {
            return await this.buket.createFile({
                bucketId: conf.appWriteBucketId,
                fileId: ID.unique(),
                file,
                permissions: ['read("any")'],
            });
        } catch (error) {
            console.log("ERROR TO UPLOAD THE FILE : : ", error);
        }
    }

    async deletefile(fileId) {
        try {
            await this.buket.deleteFile({
                bucketId: conf.appWriteBucketId,
                fileId,
            });
            return true;
        } catch (error) {
            console.log("ERROR TO DELETE THE FILE : : ", error);
            return false;
        }
    }

    previewfile(fileId) {
        try {
            const url = this.buket.getFileView({
                bucketId: conf.appWriteBucketId,
                fileId,
            });
            return typeof url === "string" ? url : url?.href || String(url || "");
        } catch (error) {
            console.log("ERROR TO PREVIEW THE FILE : : ", error);
            return "";
        }
    }

}

export const service = new Service();
