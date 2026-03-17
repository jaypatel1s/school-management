export function StudentFeeSummary() {
  // Mock data - replace with actual API call
  const summaryData = {
    total_fees: 15000,
    paid_fees: 12000,
    pending_fees: 3000,
    overdue_fees: 500,
    fee_breakdown: [
      { name: 'Tuition Fee', amount: 10000, status: 'Paid' },
      { name: 'Library Fee', amount: 500, status: 'Paid' },
      { name: 'Lab Fee', amount: 1500, status: 'Pending' },
      { name: 'Exam Fee', amount: 1000, status: 'Pending' },
      { name: 'Sports Fee', amount: 500, status: 'Overdue' },
      { name: 'Transport Fee', amount: 1500, status: 'Paid' },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Fees</h3>
          <p className="text-2xl font-bold text-gray-900">${summaryData.total_fees}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Paid</h3>
          <p className="text-2xl font-bold text-green-600">${summaryData.paid_fees}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">${summaryData.pending_fees}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Overdue</h3>
          <p className="text-2xl font-bold text-red-600">${summaryData.overdue_fees}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Breakdown</h3>
        <div className="space-y-3">
          {summaryData.fee_breakdown.map((fee) => (
            <div key={fee.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{fee.name}</h4>
                <p className="text-sm text-gray-600">${fee.amount}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                fee.status === 'Paid' 
                  ? 'bg-green-100 text-green-800' 
                  : fee.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {fee.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
