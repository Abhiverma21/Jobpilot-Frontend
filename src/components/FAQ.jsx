import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is JobPilot really free?",
      answer: "Yes! JobPilot offers a completely free plan that includes all core features like job tracking, resume upload, and AI match scoring. You can upgrade to premium for advanced analytics and priority support."
    },
    {
      question: "How accurate are the AI match scores?",
      answer: "Our AI model has been trained on thousands of successful job matches and achieves 95% accuracy in predicting job fit. The system analyzes your resume against job requirements, skills, and company culture."
    },
    {
      question: "Can I import my existing job applications?",
      answer: "Absolutely! JobPilot supports bulk import from CSV files or you can manually add your existing applications. We'll automatically extract relevant information and provide instant match scores."
    },
    {
      question: "Is my resume data secure?",
      answer: "Security is our top priority. All resume data is encrypted, stored securely, and never shared with third parties. We use industry-standard security practices to protect your information."
    },
    {
      question: "How does the skill gap analysis work?",
      answer: "Our AI analyzes job descriptions and compares them with your resume to identify missing skills or experience. We provide personalized recommendations and learning resources to help you bridge those gaps."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about JobPilot.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <button
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="mailto:support@jobpilot.com"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact our support team
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;