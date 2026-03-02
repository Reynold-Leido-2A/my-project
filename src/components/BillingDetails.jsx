

function BillingDetails({ data }) {

  return (
    <div className="bg-gray-800 p-8 rounded-lg card-hover animate-slide-up border border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded"></span>
        Billing Summary
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100 hover:bg-gray-50 px-3 py-2 rounded transition-colors duration-200">
          <span className="text-gray-600 font-medium">Product Name:</span>
          <span className="text-gray-900 font-bold text-lg">{data.productName}</span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100 hover:bg-gray-50 px-3 py-2 rounded transition-colors duration-200">
          <span className="text-gray-600 font-medium">Quantity:</span>
          <span className="text-gray-900 font-bold text-lg">{data.quantity}</span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100 hover:bg-gray-50 px-3 py-2 rounded transition-colors duration-200">
          <span className="text-gray-600 font-medium">Unit Price:</span>
          <span className="text-gray-900 font-bold text-lg">₱{data.unitPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pt-6 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-md transform transition-all duration-300 hover:shadow-lg hover:scale-102">
          <span className="text-lg font-bold text-gray-800">Total Price:</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">₱{data.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default BillingDetails
