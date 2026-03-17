import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-indigo-100 rounded-full opacity-20"></div>
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-2 h-2 sm:w-4 sm:h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-1 h-1 sm:w-2 sm:h-2 bg-indigo-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 sm:bottom-32 left-1/4 w-1.5 h-1.5 sm:w-3 sm:h-3 bg-blue-300 rounded-full opacity-40 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
            </svg>
            Join 10,000+ professionals already using JobPilot
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Track Your Job Applications
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
              Smarter with AI
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Streamline your job search with AI-powered insights from JobPilot. Upload your resume,
            track applications, and get personalized match scores to land your dream job faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center text-sm sm:text-base"
            >
              Get Started Free
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg text-center text-sm sm:text-base"
            >
              Create Free Account
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mt-16 flex justify-center">
          <div className="relative bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl max-w-sm sm:max-w-md w-full transform hover:scale-105 transition-transform duration-300">
            {/* Mock dashboard preview */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Job Applications</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">12 Active</span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">Senior Developer</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">TechCorp Inc.</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-xs sm:text-sm font-medium text-green-600">95% Match</div>
                    <div className="text-xs text-gray-500">2d ago</div>
                  </div>
                </div>

                <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">Product Manager</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">StartupXYZ</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-xs sm:text-sm font-medium text-yellow-600">78% Match</div>
                    <div className="text-xs text-gray-500">5d ago</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">AI Insights</span>
                  <span className="text-blue-600 font-medium">View Details →</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold animate-bounce">
              AI Powered
            </div>
            <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              Smart Tracking
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;