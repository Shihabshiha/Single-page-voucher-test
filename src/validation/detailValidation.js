import * as Yup from "yup";
export const descriptionValidation = Yup.string()
  .matches(/^[a-zA-Z0-9\s]*$/, "Description must be alphanumeric")
  .max(3000, "Description must not exceed 3000 characters");

export const qtyValidation = Yup.number()
  .integer("Quantity must be an integer")
  .min(1, "Quantity must be greater than 0");

export const rateValidation = Yup.number()
  .positive("Rate should be a positive number")
  .min(0.01, "Rate must be greater than 0")
  .test("no-leading-zero", "Rate cannot start with 0", (value) => {
    if (value === undefined || value === null) return true;
    const stringValue = value.toString();
    return stringValue.charAt(0) !== "0";
  });
