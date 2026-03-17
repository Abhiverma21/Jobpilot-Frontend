import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: 'Create Account',
      description: 'Sign up for free and set up your profile in minutes.',
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      step: 2,
      title: 'Upload Resume',
      description: 'Upload your resume and let our AI extract your skills automatically.',
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      step: 3,
      title: 'Track Jobs & Get AI Insights',
      description: 'Add job applications and receive AI-powered match scores and skill gap analysis.',
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with AI Job Tracker in three simple steps and transform your job search.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 sm:space-y-8 lg:space-y-0 lg:space-x-4 xl:space-x-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-xs sm:max-w-sm group">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-4 sm:p-6 mb-4 sm:mb-6 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 transform group-hover:scale-110">
                {step.icon}
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-base font-bold mb-3 sm:mb-4 shadow-lg">
                {step.step}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;