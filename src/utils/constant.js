import moment from "moment";

export const PageSize = [
  {
    label: 5,
    value: 5,
  },
  {
    label: 10,
    value: 10,
  },
  {
    label: 20,
    value: 20,
  },
  {
    label: 30,
    value: 30,
  },
  {
    label: 40,
    value: 40,
  },
  {
    label: 50,
    value: 50,
  },
  {
    label: 60,
    value: 60,
  },
  {
    label: 70,
    value: 70,
  },
  {
    label: 80,
    value: 80,
  },
  {
    label: 90,
    value: 90,
  },
  {
    label: 100,
    value: 100,
  },
  {
    label: 150,
    value: 150,
  },
];
// Expense Voucher

export const SAVE_EXPENSE = {
  amountPaid: "",
  amtCash: "",
  expenceTypeId: "",
  expenceType: "",
  expenceToId: "",
  expenceTo: "",
  roleID: "",
  employeeID: "",
  naration: "",
  approvedBy: "",
  receivedAgainstReceiptNo: "",
  employeeName: "",
  employeeType: "",
  paymentType: 1,
};

export const dynamicOptionStatus=[
  // { label: "Move", value: "Move" },
  // { label: "Assign", value: "Assign" },
  { label: "Close", value: "Close" },
  { label: "Resolve", value: "Resolve" },
  { label: "Status", value: "UpdateStatus" },
  // {
  //   label: "Category",
  //   value: "UpdateCategory",
  // },
  // {
  //   label: "Delivery Date",
  //   value: "UpdateDeliveryDate",
  // },
  // {
  //   label: "ManHours",
  //   value: "ManHours",
  // },
  {
    label: "Hold",
    value: "Hold",
  },
]
export const MOBILE_NUMBER_VALIDATION_REGX = /^[0-9]{0,10}$/;
// export const MOBILE_NUMBER_VALIDATION_REGX = /^\d{0,10}$/;
export const PINCODE_VALIDATION_REGX = /^\d{0,6}$/;
export const max7digit = /^\d{0,7}$/;
export const OTP_VALIDATION_REGX = /^\d{0,6}$/;
export const AADHARCARD_VALIDATION_REGX = /^\d{0,12}$/;
export const PANCARD_VALIDATION_REGX = /^[a-zA-Z0-9]{0,10}$/;
export const VOTER_VALIDATION_REGX = /^[a-zA-Z0-9]{0,10}$/;
export const PASSPORT_VALIDATION_REGX = /^[a-zA-Z0-9]{0,8}$/;
export const DRIVINGLICENSE_VALIDATION_REGX = /^[a-zA-Z0-9]{16}$/;
export const GST_VALIDATION_REGX = /^[a-zA-Z0-9]{0,15}$/;
// export const GSTPERCENT_VALIDATION_REGX = /^\d{0,2}$/;


export const NUMBER_VALIDATION_REGX = /^\d+$/;
// export const AMOUNT_REGX=new RegExp(`^\\d{0,6}(\\.\\d{0,${decimalPlaces}})?$`);

export const VIEWSTATUS = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Closed" },
  { value: "2", label: "All" },
];

export const  print_Type = [
  {
    name:"PDF",
    ID:"1"
  },
  {
    name:"Excel",
    ID:"2"
  },
  {
    name:"Word",
    ID:"3"
  },
]