// validations/signUpValidation.js
import * as yup from "yup";

/**
 * ============================================
 * SIGN UP VALIDATION SCHEMA
 * ============================================
 * This file contains all validation rules for the sign up form.
 * Customize these rules as needed for your requirements.
 */

export const signUpSchema = yup.object({
  /**
   * USERNAME VALIDATION
   * - Required field
   * - Minimum 3 characters
   * - Maximum 20 characters
   * - Only letters, numbers, and underscores allowed
   */
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  /**
   * EMAIL VALIDATION
   * - Required field
   * - Must be valid email format
   * - Custom regex for additional validation
   */
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address (e.g., name@domain.com)"
    ),

  /**
   * PHONE NUMBER VALIDATION
   * - Required field
   * - Exactly 10 digits
   * - Only numbers allowed
   */
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^(\+91)?[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),

  /**
   * PASSWORD VALIDATION
   * - Required field
   * - Minimum 8 characters
   * - No other restrictions (as per your request)
   * - Customize by uncommenting additional rules below
   */
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be  8 characters")
    .max(8, "Password must be  8 characters"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   'Password must contain at least one uppercase, one lowercase, one number, and one special character'
  // ),

  /**
   * CONFIRM PASSWORD VALIDATION
   * - Required field
   * - Must match the password field
   */
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

/**
 * ============================================
 * OPTIONAL: CUSTOM VALIDATION HELPERS
 * ============================================
 * You can add custom validation functions here
 * if you need more complex validation logic
 */

// Example: Check if password is common
export const isCommonPassword = (password) => {
  const commonPasswords = ["password", "12345678", "qwertyui", "admin123"];
  return commonPasswords.includes(password.toLowerCase());
};

// Example: Check if password contains username
export const containsUsername = (password, username) => {
  if (!username) return false;
  return password.toLowerCase().includes(username.toLowerCase());
};



/**
 * ============================================
 * LOGIN VALIDATION SCHEMA
 * ============================================
 * This file contains all validation rules for the login form.
 * Customize these rules as needed for your requirements.
 */

export const loginSchema = yup.object({
  /**
   * EMAIL VALIDATION
   * - Required field
   * - Must be valid email format
   * - Custom regex for additional validation
   */
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address (e.g., name@domain.com)"
    ),

  /**
   * PASSWORD VALIDATION
   * - Required field
   * - Minimum 8 characters
   * - No other restrictions
   */
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters")
    .max(8, "Password must be 8 characters"),
});

/**
 * ============================================
 * OPTIONAL: CUSTOM VALIDATION HELPERS
 * ============================================
 * You can add custom validation functions here
 * if you need more complex validation logic
 */

// Example: Check if email is from allowed domains
export const isAllowedDomain = (email) => {
  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
};