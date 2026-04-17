import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Icon } from '@iconify/react';

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const faqs = [
    {
      question: 'What is Prepo and how does it help?',
      answer:
        'Prepo is an all-in-one learning platform that helps students prepare for exams with video lectures, notes, AI chat, and practice questions.',
    },
    {
      question: 'How can I use AI Chat?',
      answer:
        'You can ask any doubt or concept, and our AI assistant will provide instant explanations to help you learn faster.',
    },
    {
      question: 'Are the notes and lectures updated?',
      answer:
        'Yes, all study materials are regularly updated to match the latest syllabus and exam patterns.',
    },
    {
      question: 'Can I access content anytime?',
      answer:
        'Yes, you can access all your content anytime from anywhere after logging into your account.',
    },
    {
      question: 'Do you provide previous year questions?',
      answer:
        'Yes, we provide PYQs with detailed solutions to help you understand exam patterns better.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer limited free content so you can explore the platform before upgrading.',
    },
    {
      question: 'How do I contact support?',
      answer:
        'You can reach out to us through the contact page or email us for any queries or support.',
      link: 'Go to Contact Page',
    },
    {
      question: 'Can I use this on mobile?',
      answer:
        'Yes, our platform is fully responsive and works smoothly on mobile, tablet, and desktop devices.',
    },
  ];

  return (
    <>
      <div className="mainMaxWidth">
        <Header />

        <div className="px-3 md:px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Frequently Asked Questions ❓
            </h1>

            <p className="text-center text-gray-600 mb-10">
              Find answers to common questions about our platform and features.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={index}
                    className="rounded-lg md:p-4 p-3 bg-[#efefef]"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      <h3 className="font-medium text-gray-800">
                        {faq.question}
                      </h3>

                      <div className="p-1">
                        {isOpen ? (
                          <Icon icon="line-md:minus" size={18} />
                        ) : (
                          <Icon icon="akar-icons:plus" size={18} />
                        )}
                      </div>
                    </div>

                    {isOpen && faq.answer && (
                      <div className="mt-4 text-gray-700 space-y-3">
                        <p>{faq.answer}</p>

                        {faq.link && (
                          <div
                            onClick={() => (window.location.href = '/contact')}
                            className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 cursor-pointer"
                          >
                            <span>{faq.link}</span>
                            <Icon icon="si:arrow-right-duotone" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FaqPage;