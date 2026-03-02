import { useState, useEffect } from 'react'
import ProductDetails from '../components/ProductDetails'
import BillingDetails from '../components/BillingDetails'

function PriceChecker() {
  useEffect(() => {
    document.title = 'Price Checker'
  }, [])

  const [billingData, setBillingData] = useState(null)

  const handleCalculate = (data) => {
    const total = data.quantity * data.unitPrice
    setBillingData({
      ...data,
      total
    })
  }

  const handleReset = () => {
    setBillingData(null)
  }

  return (
    <div className="flex flex-col items-center space-y-6 card-hover animate-slide-up w-full max-w-3xl">
      <h1 className="text-4xl font-bold text-green-400 mb-2 text-center">Price Checker</h1>
      <p className="text-gray-600 text-lg text-center">
        Calculate your total price effortlessly
      </p>
      
      <div className="w-full grid md:grid-cols-2 gap-8">
        <ProductDetails onCalculate={handleCalculate} onReset={handleReset} />
        
        {billingData && (
          <BillingDetails data={billingData} />
        )}
      </div>
    </div>
  )
}

export default PriceChecker
