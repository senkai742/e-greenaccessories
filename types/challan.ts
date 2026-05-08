export interface ChallanItem {
  id: string;
  slNo: number;
  description: string;
  orderQty: number | string;
  deliveryQty: number | string;
  remark: string;
}

export interface ChallanData {
  id: string;
  challanNo: number;
  date: string;
  name: string;
  address: string;
  buyer: string;
  attn: string;
  bookingNo: string;
  poOrderNo: string;
  items: ChallanItem[];
  createdAt: string;
}
