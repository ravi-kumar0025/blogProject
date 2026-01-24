import conf from "../../const.js";
import { Client, Account, ID } from "appwrite";

export class auth{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const user=await this.account.create({
                userId:ID.unique(),
                email:email,
                password:password,
                name:name,
            })
            console.log(user);
        } catch (error) {
            console.log("ERROR IN ACCOUNT CREATION : : ",error);
        }
    }

    async login({email,password}){
        try {
            const result=await this.account.createEmailPasswordSession({
                email:email,
                password:password,
            })
            console.log("LOGIN SUCCESSFULLY");
        } catch (error) {
            console.log("ERROR TO LOGIN : : ",error);
        }
    }

    async logOut(){
        try {
            await this.account.deleteSessions();
            console.log("USER LOGED OUT FROM ALL SOURCES\n");
        } catch (error) {
            console.log("ERROR TO LOGOUT : : ",error);
        }
    }
    async getUser(){
        try {
            return await this.account.getUser();
        } catch (error) {
            console.log("ERROR TO GET USER : : ",error);
            return null;
        }
    }
}

const authService=new auth();
export default authService