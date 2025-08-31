import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function CardList(item) {
  console.log('🚀 ~ CardList ~ item:', item);

  return (
    <Card key={item.title} className='py-4 px-4 gap-2 hover:bg-muted cursor-pointer' onClick={item.onClick}>
      <CardHeader className="rounded-sm flex-row justify-between w-full p-0">
        <CardTitle className="text-md flex items-center">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm p-0 flex gap-12 items-center w-full">
        {item.content}
      </CardContent>
      <CardFooter>{item.footer}</CardFooter>
    </Card>
  );
}
