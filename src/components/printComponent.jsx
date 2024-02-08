import { useSelector } from "react-redux";


const PrintableComponent = () => {
  const headerData = useSelector((state) => state.header.headerData);
  const detailData = useSelector((state) => state.detailTable.detailData);

  const calculateTotalAmt = () => {
    let totalAmt = 0;
    detailData.forEach((item) => {
      totalAmt += item.qty * item.rate;
    });
    return totalAmt;
  };

  const totalAmt = calculateTotalAmt();

  const generatePrintableModel = () => {
    const printableModel = ` 
      <div className="p-3 border border-gray-200">
        <h1 className="text-xl font-bold mb-10">UnplugApps</h1>
        <h2 className="text-lg font-semibold mb-4">Sample Sales Voucher</h2>
        <div className="flex justify-between">
            <p className="mb-2"><span className="font-bold">Voucher Number:</span> ${
              headerData.vrNo
            }</p>
            <p className="mb-2"><span className="font-bold">Voucher Date:</span> ${
              headerData.vrDate
            }</p>
        </div>
        <div className="flex justify-between">
          <p className="mb-2"><span className="font-bold">Account Name:</span> ${
            headerData.acName
          }</p>
          <p className="mb-2"><span className="font-bold">Account Amount:</span> ${
            headerData.acAmt
          }</p>
        </div>
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Sr.No</th>
              <th className="px-4 py-2">Item Code</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Rate</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${detailData
              .map(
                (item, index) => `
              <tr>
                <td className="border px-4 py-2">${index + 1}</td>
                <td className="border px-4 py-2">${item.itemCode}</td>
                <td className="border px-4 py-2">${item.itemName}</td>
                <td className="border px-4 py-2">${item.qty}</td>
                <td className="border px-4 py-2">${item.rate}</td>
                <td className="border px-4 py-2">${item.qty * item.rate}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <div className="flex justify-end mr-2">
          <p className="mr-24">Total:- ${totalAmt}</p>
        </div>
      </div>
    `;
    return printableModel;
  };

  const handlePrint = () => {
    const printableContent = generatePrintableModel();

    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Printable Voucher</title>
        </head>
        <body>
          ${printableContent}
        </body>
      </html>
    `);
    printWindow.document.close();

    printWindow.print();
  };

  return (
    <button
      className="mb-2 px-4 py-2 rounded bg-amber-300 hover:bg-amber-400 "
      onClick={handlePrint}
    >
      Print
    </button>
  );
};

export default PrintableComponent;
