// validations/roomManagementValidation.js
import * as yup from "yup";

/**
 * ============================================
 * ROOM MANAGEMENT VALIDATION SCHEMAS
 * ============================================
 * This file contains all validation rules for room management
 */

// ============================================
// ROOM EDIT VALIDATION
// ============================================
export const roomEditSchema = yup.object({
  roomNumber: yup.string().required("Room number is required"),
  roomType: yup.string().required("Room type is required"),
  floor: yup
    .number()
    .required("Floor is required")
    .min(0, "Floor must be 0 or greater"),
  monthlyRent: yup
    .number()
    .required("Monthly rent is required")
    .min(0, "Monthly rent cannot be negative"),
  deposit: yup
    .number()
    .required("Deposit is required")
    .min(0, "Deposit cannot be negative"),
});

// ============================================
// ELECTRICITY BILL VALIDATION
// ============================================
export const electricityBillSchema = yup.object({
  currentReading: yup
    .number()
    .required("Current reading is required")
    .min(0, "Current reading cannot be negative"),
  previousReading: yup
    .number()
    .required("Previous reading is required")
    .min(0, "Previous reading cannot be negative"),
  ratePerUnit: yup
    .number()
    .required("Rate per unit is required")
    .min(0, "Rate per unit cannot be negative"),
  paidAmount: yup
    .number()
    .required("Paid amount is required")
    .min(0, "Paid amount cannot be negative"),
  paymentDate: yup.string().required("Payment date is required"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["paid", "partial", "unpaid"], "Invalid status"),
});

// ============================================
// ADDITIONAL PAYMENT VALIDATION
// ============================================
export const additionalPaymentSchema = yup.object({
  type: yup.string().required("Payment type is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0, "Amount cannot be negative"),
  paidAmount: yup
    .number()
    .required("Paid amount is required")
    .min(0, "Paid amount cannot be negative"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["paid", "partial", "unpaid"], "Invalid status"),
  paymentDate: yup.string().required("Payment date is required"),
});

// ============================================
// REMARKS VALIDATION
// ============================================
export const remarksSchema = yup.object({
  remarks: yup.string().max(500, "Remarks cannot exceed 500 characters"),
});

// ============================================
// ROOM TYPES
// ============================================
export const ROOM_TYPES = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "shop", label: "Shop" },
  { value: "PG", label: "PG" },
  { value: "1RK", label: "1 RK" },
  { value: "1BHK", label: "1 BHK" },
  { value: "2BHK", label: "2 BHK" },
  { value: "3BHK", label: "3 BHK" },
  { value: "4BHK", label: "4 BHK" },
];

// ============================================
// PAYMENT TYPES
// ============================================
export const PAYMENT_TYPES = [
  { value: "water", label: "Water Bill" },
  { value: "wifi", label: "WiFi Bill" },
  { value: "motor", label: "Motor Bill" },
  { value: "maintenance", label: "Maintenance" },
  { value: "other", label: "Other" },
];

// ============================================
// PAYMENT STATUS
// ============================================
export const PAYMENT_STATUS = [
  { value: "paid", label: "Paid", color: "green" },
  { value: "partial", label: "Partially Paid", color: "yellow" },
  { value: "unpaid", label: "Unpaid", color: "red" },
];

// ============================================
// MONTHS & YEARS HELPERS
// ============================================
export const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    years.push({ value: i.toString(), label: i.toString() });
  }
  return years;
};
