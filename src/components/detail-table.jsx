import { useDispatch, useSelector } from "react-redux";
import { fetchItems, updateDetail } from "../redux/detailTableSlice";
import { useEffect, useState } from "react";
import {
  descriptionValidation,
  qtyValidation,
  rateValidation,
} from "../validation/detailValidation";

const DetailTable = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const detailData = useSelector((state) => state.detailTable.detailData);
  const items = useSelector((state) => state.detailTable.items);

  const handleChange = async (index, field, value) => {
    // dispatch(updateDetail({ index, field, value }));
    let validationSchema, fieldName;

    if (field === "qty") {
      validationSchema = qtyValidation;
      fieldName = "qty";
      value = parseInt(value);
    } else if (field === "rate") {
      validationSchema = rateValidation;
      fieldName = "rate";
      value = parseInt(value);
    } else if (field === "description") {
      validationSchema = descriptionValidation;
      fieldName = "description";
    }
    try {
      if (!value) {
        dispatch(updateDetail({ index, field, value: null }));
        return;
      }
      await validationSchema.validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
      dispatch(updateDetail({ index, field, value }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.message,
      }));
    }
  };

  const calculateTotalAmt = () => {
    let totalAmt = 0;
    detailData.forEach((item) => {
      totalAmt += item.qty * item.rate;
    });
    return totalAmt;
  };

  const handleItemCodeChange = (index, field, value) => {
    dispatch(updateDetail({ index, field, value }));
    const selectedItem = items.find((item) => item.item_code === value);
    if (selectedItem)
      dispatch(
        updateDetail({
          index,
          field: "itemName",
          value: selectedItem.item_name,
        })
      );
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  return (
    <div className="mt-10">
      <h1 className="bg-orange-300 text-center font-semibold">Detail</h1>
      <table className="table-auto w-full">
        <thead className="bg-slate-300">
          <tr>
            <th className="px-4 py-2 text-center">Sr. No</th>
            <th className="px-4 py-2">Item Code</th>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Rate</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {detailData.length > 0 &&
            detailData.map((row, index) => (
              <tr key={index}>
                <td className="border px-2 py-2 text-center">{index + 1}</td>
                <td className="border px-2 py-2 text-start">
                  <select
                    value={row.itemCode}
                    onChange={(e) =>
                      handleItemCodeChange(index, "itemCode", e.target.value)
                    }
                  >
                    <option value="Select item code">Select Item code</option>
                    {items.length &&
                      items.map((item) => (
                        <option key={item.item_code} value={item.item_code}>
                          {item.item_code}
                        </option>
                      ))}
                  </select>
                </td>
                <td className="border px-2 py-2 text-start">{row.itemName}</td>
                <td className="border px-2 py-2 text-start">
                  <input
                    type="text"
                    value={row.description}
                    className="border"
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                  />
                  {errors.description && (
                    <div className="text-red-500 ml-1 mt-1">
                      {errors.description}
                    </div>
                  )}
                </td>
                <td className="border px-2 py-2 text-end">
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleChange(index, "qty", e.target.value)}
                  />
                  {errors.qty && (
                    <div className="text-red-500 ml-1 mt-1">{errors.qty}</div>
                  )}
                </td>
                <td className="border px-2 py-2 text-end">
                  <input
                    type="number"
                    value={row.rate}
                    onChange={(e) =>
                      handleChange(index, "rate", e.target.value)
                    }
                  />
                  {errors.rate && (
                    <div className="text-red-500 ml-1 mt-1">{errors.rate}</div>
                  )}
                </td>
                <td className="border px-2 py-2 text-end">
                  {row.qty * row.rate}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-end mr-2">
        <p className="mr-24">Total:-</p>
        <p>{calculateTotalAmt()}</p>
      </div>
    </div>
  );
};

export default DetailTable;
