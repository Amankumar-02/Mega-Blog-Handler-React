import config from "../config/config";
import { Client, ID, Account } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // call another function
                this.createLogin({email, password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw("Medium :" + error.message)
        }
    }
    async createLogin({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw("Medium :" + error.message)
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Medium :" + error.message)
        }
        return null
    }
    async createLogout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Medium :" + error.message)
        }
    }
}

const authService = new AuthService();
export default authService