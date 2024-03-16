import { AppRole } from "./AppRole.model";

export class AppUser{
    id!: number;
    userName: string;
    password: string;
    appRoles!: AppRole[];

    constructor(userName: string,password: string){
        this.userName=userName;
        this.password=password;
    }

    public getId(): number{
        return this.id;
    }

    public setId(id: number): void{
        this.id=id;
    }
}