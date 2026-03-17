import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
          Start Your Smart Job Search Today
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
          Join thousands of professionals who are using JobPilot to find their next career opportunity.
          Create your free account and start tracking jobs smarter.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors inline-block shadow-lg"
        >
          Create Free Account
        </Link>
        <p className="text-blue-200 mt-3 sm:mt-4 text-xs sm:text-sm">
          No credit card required • Free forever plan available
        </p>
      </div>
    </section>
  );
};

export default CTA;