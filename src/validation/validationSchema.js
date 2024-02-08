import * as Yup from "yup";

export const vrNoSchema = Yup.string()
  .matches(/^\d+$/, "Vr No must be a number")
  .required("Vr No is required");

export const statusSchema = Yup.string()
  .oneOf(["I", "A"], "Invalid Status")
  .required("Status required");

export const acNameSchema = Yup.string()
  .trim()
  .matches(/^[a-zA-Z\s]*$/, "Ac Name must be alphabetic")
  .required("Ac name required");
