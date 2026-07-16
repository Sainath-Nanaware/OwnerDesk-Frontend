// validations/roomValidation.js
import * as yup from "yup";

/**
 * ============================================
 * ROOM VALIDATION SCHEMA
 * ============================================
 * This file contains validation rules for room form
 * Customize these rules as needed
 */

export const roomSchema = yup.object({
  /**
   * ROOM NUMBER - Required
   */
  roomNumber: yup
    .string()
    .required("Room number is required")
    .matches(
      /^[A-Za-z0-9-]+$/,
      "Room number can only contain letters, numbers, and hyphens"
    ),

  /**
   * ROOM TYPE - Required, must be one of the enum values
   */
  roomType: yup
    .string()
    .required("Room type is required")
    .oneOf(
      ["single", "double", "triple", "dormitory", "studio", "1RK","1BHK","2BHK","3BHK","4BHK","PG","shop","office"],
      "Invalid room type"
    ),

  /**
   * FLOOR - Required, must be a number
   */
  floor: yup
    .number()
    .required("Floor number is required")
    .min(0, "Floor must be 0 or greater")
    .max(100, "Floor cannot exceed 100"),

  /**
   * MONTHLY RENT - Required, must be positive
   */
  monthlyRent: yup
    .number()
    .required("Monthly rent is required")
    .min(0, "Monthly rent cannot be negative")
    .max(999999, "Monthly rent is too high"),

  /**
   * DEPOSIT - Required, must be positive
   */
  deposit: yup
    .number()
    .required("Deposit amount is required")
    .min(0, "Deposit cannot be negative")
    .max(999999, "Deposit amount is too high"),
});

/**
 * ============================================
 * ROOM TYPES ENUM - Match your backend
 * ============================================
 */
export const ROOM_TYPES = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "triple", label: "Triple" },
  { value: "dormitory", label: "Dormitory" },
  { value: "studio", label: "Studio" },
  { value: "1RK", label: "1 RK" },
  { value: "2BHK", label: "1 BHK" },
  { value: "3BHK", label: "2 BHK" },
  { value: "4BHK", label: "3 BHK" },
  { value: "PG", label: "PG" },
  { value: "shop", label: "Shop" },
  { value: "office", label: "Office" },
];
/**
 * ============================================
 * OCCUPANCY STATUS - Match your backend
 * ============================================
 */
export const OCCUPANCY_STATUS = [
  { value: "all", label: "All" },
  { value: "occupied", label: "Occupied" },
  { value: "vacant", label: "Vacant" },
];
