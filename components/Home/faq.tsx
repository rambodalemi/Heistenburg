import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Will I get banned?",
    answer: "There is no chance for you to get banned. I have over 100m playing in other people's modded heists.",
  },
  {
    question: "How many people can join per heist?",
    answer: "There are three people in a heist at a time.",
  },
  {
    question: "What heist is it?",
    answer: "It is the Pacific Standard Heist but modded.",
  },
  {
    question: "How much money do I make?",
    answer: "You make $15,000,000 per heist.",
  },
  {
    question: "How often can I do heists?",
    answer: "Safely up to 4 times a day.",
  },
  {
    question: "How often do you host heists?",
    answer: "I will host up to 2 heists a day on my own. If we can get more members and modders, we can host up to 20 heists per day.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800">
              <AccordionTrigger className="text-left hover:text-green-500">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-zinc-400">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}