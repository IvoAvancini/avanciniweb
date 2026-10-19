"use client";

import { useState } from "react";
import type { SolutionFAQ } from "../../solutions-data";

export function SolutionFaqAccordion({ faqs }: { faqs: SolutionFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="solution-faq-list">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index}`;
        return (
          <article key={faq.question} className={`solution-faq-item ${isOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="solution-faq-question"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="faq-number">0{index + 1}</span>
              <strong>{faq.question}</strong>
              <span className="faq-toggle" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div className="solution-faq-answer" id={answerId} aria-hidden={!isOpen}>
              <p>{faq.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
