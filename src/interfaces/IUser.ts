export interface IUser {
   id?: number;
   image: string;
   name: string;
   email: string;
   password: string;
   phone: string;
   date: Date | string;
   job_desc: string;
   state: boolean;
}
