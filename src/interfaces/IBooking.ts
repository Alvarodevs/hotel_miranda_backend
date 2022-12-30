export interface IBooking {
   id?: string;
   photo: string;
   guest_name: string;
   order_date: Date | string;
   check_in: Date | string;
   check_out: Date | string;
   request: string;
   room_type: string;
   status: string;
   price: number;
   amenities: string;
   room_desc: string;
}
