export interface IBooking {
   id?: string;
   photo: string;
   guest_name: string;
   order_date: Date;
   check_in: Date;
   check_out: Date;
   request: string;
   room_type: string;
   status: string;
   price: number;
   amenities: string;
   room_desc: string;
}
