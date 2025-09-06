import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function CardList(item) {
  console.log('🚀 ~ CardList ~ item:', item);

  return (
    <Card
      key={item.title}
      className="hover:bg-muted cursor-pointer gap-2 px-4 py-4"
      onClick={item.onClick}
    >
      <CardHeader className="w-full flex-row justify-between rounded-sm p-0">
        <CardTitle className="text-md flex items-center">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full items-center gap-12 p-0 text-sm">
        {item.content}
      </CardContent>
      <CardFooter>{item.footer}</CardFooter>
    </Card>
  );
}
