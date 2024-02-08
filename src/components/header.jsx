import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  setAcName,
  setStatus,
  setTotalAmt,
  setVrDate,
  setVrNo,
} from "../redux/headerTableSlice";
import {
  acNameSchema,
  statusSchema,
  vrNoSchema,
} from "../validation/validationSchema";

const Header = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const vrNo = useSelector((state) => state.header.headerData.vrNo);
  const vrDate = useSelector((state) => state.header.headerData.vrDate);
  const detailData = useSelector((state) => state.detailTable.detailData);
  const accountName = useSelector((state) => state.header.headerData.acName);
  const status = useSelector((state) => state.header.headerData.status);

  const calculateTotalAmt = (detailData) => {
    let totalAmt = 0;
    detailData.forEach((item) => {
      totalAmt += item.qty * item.rate;
    });
    return totalAmt;
  };

  const totalAmt = calculateTotalAmt(detailData);

  useEffect(() => {
    const today = new Date();
    const formatted = format(today, "dd-MM-yyyy");
    dispatch(setVrDate(formatted));
  }, []);

  useEffect(() => {
    dispatch(setTotalAmt(totalAmt));
  }, [dispatch, totalAmt]);

  const handleAcName = async (e) => {
    const { value } = e.target;
    try {
      if (!value) {
        dispatch(setAcName(""));
        setErrors((prevErrors) => ({
          ...prevErrors,
          acName: "Ac name required",
        }));
        return;
      }
      await acNameSchema.validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, acName: "" }));
      dispatch(setAcName(value));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, acName: error.message }));
    }
  };

  const handleStatus = async (e) => {
    const { value } = e.target;
    try {
      await statusSchema.validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, status: "" }));
      dispatch(setStatus(value));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, status: error.message }));
    }
  };

  const handleVrNo = async (e) => {
    const { value } = e.target;
    try {
      if (!value) {
        dispatch(setVrNo(""));
        setErrors((prevErrors) => ({
          ...prevErrors,
          vrNo: "Voucher No. required",
        }));
        return;
      }
      await vrNoSchema.validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, vrNo: "" }));
      dispatch(setVrNo(value));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, vrNo: error.message }));
    }
  };

  return (
    <div className="mt-4">
      <h1 className="bg-yellow-300 text-center font-semibold">Header</h1>
      <div className="container p-10 px-24">
        <div className="flex  justify-between">
          <div className="flex flex-col">
            <div className="flex">
              <p>Vr No :-</p>
              <input
                type="text"
                name="vr_number"
                id="vr_number"
                className="rounded-sm border ml-1"
                onChange={handleVrNo}
                value={vrNo}
              />
            </div>
            {errors.vrNo && (
              <div className="text-red-500 ml-16 mt-1">{errors.vrNo}</div>
            )}
          </div>
          <div className="flex">
            <p>Vr Date :-</p>
            <input
              type="text"
              name="vr_date"
              id="vr_date"
              value={vrDate}
              className="rounded-sm border ml-1"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <p>Status :-</p>
              <select
                className="block bg-white border border-gray-400 hover:border-gray-500 px-2 ml-1"
                id="status"
                onChange={handleStatus}
                value={status}
              >
                <option value="">Select status</option>
                <option value="A">Active</option>
                <option value="I">Inactive</option>
              </select>
            </div>
            {errors.status && (
              <div className="text-red-500 ml-16 mt-1">{errors.status}</div>
            )}
          </div>
        </div>
        <div className="flex mt-10 justify-between">
          <div className="flex flex-col">
            <div className="flex">
              <p>Ac Name :-</p>
              <input
                type="text"
                id="ac_name"
                name="ac_name"
                value={accountName}
                className="rounded-sm border ml-1 w-96"
                onChange={handleAcName}
              />
            </div>
            {errors.acName && (
              <div className="text-red-500 ml-20 mt-1">{errors.acName}</div>
            )}
          </div>
          <div className="flex">
            <p>Ac Amt</p>
            <input
              type="text"
              id="ac_amt"
              value={calculateTotalAmt(detailData)}
              name="ac_amt"
              className="rounded-sm border ml-1"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
