import React from "react";
import { Card } from "@/components/ui/card";
interface FAQItem {
  id: string;
  question: string;
  answer?: string;
}

interface HelpCenterProps {
  title1?: string;
  title2?: string;
  faqItems?: FAQItem[];
}

const defaultFAQItems: FAQItem[] = [
  { id: "1", question: "How do I create an account?" },
  { id: "2", question: "How do I create an account?" },
  { id: "3", question: "How do I create an account?" },
  { id: "4", question: "How do I create an account?" },
  { id: "5", question: "How do I create an account?" },
  { id: "6", question: "How do I create an account?" },
  { id: "7", question: "How do I create an account?" },
  { id: "8", question: "How do I create an account?" },
];

const HelpCenter = ({
  title1 = "Client technical Issue",
  title2 = "Customer technical Issue",
  faqItems = defaultFAQItems,
}: HelpCenterProps) => {
  return (
    <section>
      <div className="w-full  mx-auto p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-8">
          {title1}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqItems.map((item) => (
            <Card
              key={item.id}
              className="p-6 bg-card hover:bg-accent/50 transition-colors cursor-pointer border border-border"
            >
              <p className="text-foreground text-base leading-relaxed">
                {item.question}
              </p>
            </Card>
          ))}
        </div>

      
      </div>

          <div className="w-full  mx-auto p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-8">
          {title2}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqItems.map((item) => (
            <Card
              key={item.id}
              className="p-6 bg-card hover:bg-accent/50 transition-colors cursor-pointer border border-border"
            >
              <p className="text-foreground text-base leading-relaxed">
                {item.question}
              </p>
            </Card>
          ))}
        </div>

      
      </div>


    </section>
  );
};

export default HelpCenter;
