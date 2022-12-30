export interface IContact {
   id?: number;
   date: Date;
   customer: string;
   email: string;
   phone: string;
   subject: string;
   comment: string;
   archived: boolean;
}
