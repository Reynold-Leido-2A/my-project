import { useState } from 'react'

function ProductDetails({ onCalculate, onReset }) {

  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unitPrice, setUnitPrice] = useState('')

  const handleCalculate = () => {
    if (productName && quantity && unitPrice) {
      onCalculate({
        productName,
        quantity: parseFloat(quantity),
        unitPrice: parseFloat(unitPrice)
      })
    }
  }

  const handleReset = () => {
    setProductName('')
    setQuantity('')
    setUnitPrice('')
    onReset()
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg card-hover animate-slide-up border border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded"></span>
        Product Details
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-600 rounded transition-colors duration-200 focus:border-green-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="w-full px-4 py-2 border border-gray-600 rounded transition-colors duration-200 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Unit Price
          </label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="Enter unit price"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-600 rounded transition-colors duration-200 focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div className="flex gap-3 pt-6">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Calculate
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
