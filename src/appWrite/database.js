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
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                ID.unique(),
                { title, image, content, status, userId, },
            );
        } catch (error) {
            console.log("ERROR TO CREATE POST", error);
        }
    }

    async updatePost(documentId, { title, image, content, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                documentId,
                {
                    title,
                    image,
                    content,
                    status,
                    $updatedAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            console.log("ERROR TO UPDATE POST", error);
        }
    }

    async deletePost(documentId) {
        try {
            return await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                documentId
            );
        } catch (error) {
            console.log("ERROR TO DELETE POST : : ", error);
        }
    }

    async getPost(documentId) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                documentId
            );
        } catch (error) {
            console.log("ERROR TO GET THE POST : : ", error);
        }
    }

    async getPosts() {
        const queries = [
            Query.equal('status', 'active'),
        ]
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries,
            );
        } catch (error) {
            console.log("ERROR TO GET THE POSTS : : ", error);
        }
    }

    async uploadfile(file) {
        try {
            return await this.buket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("ERROR TO UPLOAD THE FILE : : ", error);
        }
    }

    async deletefile(fileId) {
        try {
            await this.buket.deleteFile(
                conf.appWriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("ERROR TO DELETE THE FILE : : ", error);
        }
    }

    async previewfile(fileId) {
        try {
            return this.buket.getFilePreview(
                conf.appWriteBucketId,
                fileId,
            );
        } catch (error) {
            console.log("ERROR TO PREVIEW THE FILE : : ", error);
        }
    }

}

export const service = new Service();