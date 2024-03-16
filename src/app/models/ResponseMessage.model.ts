
export class ResponseMessage{
    success: boolean;
    message: string;
    body: Object;

    constructor(success:boolean,message:string,body:Object){
        this.success=success;
        this.message=message;
        this.body=body;
    }
  
}