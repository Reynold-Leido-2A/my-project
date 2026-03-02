import { useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg card-hover animate-slide-up transition-shadow duration-300 w-full max-w-3xl">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Price Checker Application</h1>
      
      <div className="space-y-6 w-full">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer card-hover w-full">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">Conditional Rendering</h2>
          <p className="text-gray-700">
            Conditional rendering in React allows you to render different content based on certain conditions. 
            For example, in this app, the BillingDetails component is only displayed after the "Calculate" button 
            is clicked. This is achieved using JavaScript ternary operators or if statements to conditionally 
            include components in the JSX.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer card-hover w-full">
          <h2 className="text-2xl font-semibold text-green-600 mb-3">UseEffects</h2>
          <p className="text-gray-700">
            useEffect is a React Hook that lets you perform side effects in functional components. 
            In this application, useEffect is used to update the document title whenever the component mounts. 
            The dependency array [] ensures this effect runs only once when the component first renders, 
            making it perfect for initialization tasks.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer card-hover w-full">
          <h2 className="text-2xl font-semibold text-purple-600 mb-3">Routing Components (BrowserRouter, Routes, Route, Link)</h2>
          <p className="text-gray-700">
            <strong>BrowserRouter:</strong> Provides routing context for the entire application. <br />
            <strong>Routes:</strong> Renders the first Route or Redirect that matches the location. <br />
            <strong>Route:</strong> Renders an element when its path matches the current URL. <br />
            <strong>Link:</strong> Navigation component that allows users to navigate between routes without page refresh. 
            In this app, the navigation bar uses Link components to navigate between the Home, Price Checker and API Practice pages.
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-yellow-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer card-hover w-full">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-3">HTTP Requests (axios)</h2>
          <p className="text-gray-700">
            axios is a popular library for making HTTP requests from the browser. 
            In the API Practice page of this application, axios is used inside <code>useEffect</code> to fetch
            posts with a <code>GET</code> request, as well as <code>POST</code>, <code>PUT</code>, and <code>DELETE</code> requests
            to create, update and remove posts. The component shows different UI states while the
            requests are loading, submitting, or failing.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
