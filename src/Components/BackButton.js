import React from 'react'
import { Link } from 'react-router-dom'

function BackButton() {
  return (
    <Link to="/" className="mt-4 w-full py-2 rounded-md font-semibold text-gray-600 border border-gray-300 hover:bg-gray-900 flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M7.293 10l3.646-3.646a.5.5 0 01.854.353v7.586a.5.5 0 01-.854.353L7.293 10zm-.939.293a1 1 0 010-1.415l4-4a1 1 0 111.414 1.414L8.12 10l3.536 3.536a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
    Back
  </Link>
  )
}

export default BackButton