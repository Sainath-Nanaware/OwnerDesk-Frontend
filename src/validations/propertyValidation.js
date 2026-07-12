// validations/propertyValidation.js
import * as yup from "yup";

/**
 * ============================================
 * PROPERTY VALIDATION SCHEMA
 * ============================================
 * This file contains validation rules for property form
 * Customize these rules as needed
 */

export const propertySchema = yup.object({
  /**
   * PROPERTY NAME - Required, min 3 chars
   */
  propertyName: yup
    .string()
    .required("Property name is required")
    .min(3, "Property name must be at least 3 characters")
    .max(50, "Property name must be at most 50 characters"),

  /**
   * ADDRESS - Required, min 5 chars
   */
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),

  /**
   * CITY - Required
   */
  city: yup.string().required("City is required"),

  /**
   * STATE - Required
   */
  state: yup.string().required("State is required"),

  /**
   * PINCODE - Required, exactly 6 digits (India)
   */
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Please enter a valid 6-digit pincode"),

  /**
   * TOTAL ROOMS - Required, minimum 1
   */
  totalRooms: yup
    .number()
    .required("Total rooms is required")
    .min(1, "Must have at least 1 room")
    .max(999, "Maximum 999 rooms allowed"),

  /**
   * OCCUPIED ROOMS - Optional, must be less than total rooms
   */
  occupiedRooms: yup
    .number()
    .min(0, "Cannot be negative")
    .max(yup.ref("totalRooms"), "Occupied rooms cannot exceed total rooms"),
});
