// validations/profileValidation.js
import * as yup from "yup";

/**
 * ============================================
 * USER PROFILE VALIDATION SCHEMAS
 * ============================================
 * This file contains validation rules for profile forms
 */

/**
 * ============================================
 * PROFILE INFO EDIT VALIDATION
 * ============================================
 * Validates username, email and mobile number
 * when user edits their profile
 */
export const profileEditSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters")
    .matches(
      /^[a-zA-Z0-9_. -]+$/,
      "Username can contain letters, numbers, spaces, dots, underscores, and hyphens only."
    ),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ),

  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(
      /^(\+91)?[6-9]\d{9}$/,
      "Please enter a valid 10-digit mobile number"
    ),
});

/**
 * ============================================
 * CHANGE PASSWORD VALIDATION
 * ============================================
 * Validates old and new password
 * Enforces strong password rules on new password
 */
export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Old password is required"),

  newPassword: yup
    .string()
    .required("New password is required")
    .length(8, "Password must be exactly 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter and one number"
    ),

  confirmNewPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword"), null], "Passwords do not match"),
});
