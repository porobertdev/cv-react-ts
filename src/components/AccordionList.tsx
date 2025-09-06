import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export default function AccordionList() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger></AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
