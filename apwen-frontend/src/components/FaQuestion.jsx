import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does the AI suggest materials?",
    answer:
      "Our AI analyzes your project requirements like strength, cost, environment, and sustainability to suggest materials that best fit your goals in seconds.",
  },
  {
    question: "Can I export material suggestions?",
    answer:
      "Yes, you can instantly export suggestions and material data in CSV format for seamless collaboration and reporting.",
  },
  {
    question: "Is this suitable for small projects?",
    answer:
      "Absolutely. Whether you're building a small prototype or managing large-scale infrastructure, our tool adapts to your needs.",
  },
  {
    question: "How are sustainability scores calculated?",
    answer:
      "We aggregate data from multiple sources to score materials based on recyclability, carbon footprint, and regional impact factors.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl jakarta-font mx-auto px-4 py-12">
      <h2 className="text-4xl font-semibold text-blue-600 text-center mb-10">
        FAQS
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-t-2 mb-6 px-6 py-4  bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="text-xl font-semibold text-black">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="text-gray-800" />
              ) : (
                <ChevronDown className="text-gray-800" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-5 text-sm text-gray-600 font-semibold transition-all">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
