// validations/tenantValidation.js
import * as yup from "yup";

/**
 * ============================================
 * TENANT VALIDATION SCHEMA
 * ============================================
 * This file contains validation rules for tenant form
 * Customize these rules as needed
 */

export const tenantSchema = yup.object({
  /**
   * FULL NAME - Required, min 3 characters
   */
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  /**
   * PHONE NUMBER - Required, exactly 10 digits (India)
   */
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),

  /**
   * EMAIL - Required, valid email format
   */
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ),

  /**
   * ID PROOF TYPE - Required, must be one of the enum values
   */
  idProofType: yup
    .string()
    .required("ID proof type is required")
    .oneOf(
      ["aadhar", "pan", "passport", "voterid", "drivinglicence", "other"],
      "Invalid ID proof type"
    ),

  /**
   * ID PROOF NUMBER - Required, min 5 characters
   */
  idProofNumber: yup
    .string()
    .required("ID proof number is required")
    .min(5, "ID proof number must be at least 5 characters")
    .max(20, "ID proof number must be at most 20 characters"),
});

/**
 * ============================================
 * ID PROOF TYPES - Match your backend enum
 * ============================================
 */
export const ID_PROOF_TYPES = [
  { value: "aadhar", label: "Aadhar Card" },
  { value: "pan", label: "PAN Card" },
  { value: "passport", label: "Passport" },
  { value: "voterid", label: "Voter ID" },
  { value: "drivinglicence", label: "Driving Licence" },
  { value: "other", label: "Other" },
];

/**
 * ============================================
 * TENANT STATUS - Match your backend enum
 * ============================================
 */
export const TENANT_STATUS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
