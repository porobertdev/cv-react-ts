'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { ControllerRenderProps } from 'react-hook-form';

interface DatePickerInputProps<TFieldValues> {
  field: ControllerRenderProps<TFieldValues, string>; // string for startDate/endDate
  disabled?: boolean;
}

export function DatePickerInput<TFieldValues>({
  field,
  disabled,
}: DatePickerInputProps<TFieldValues>) {
  const selectedDate = field.value
    ? new Date(field.value + 'T00:00:00') // fix timezone shift
    : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn('text-left font-normal', !field.value && 'text-muted-foreground')}
            disabled={disabled}
          >
            {/* don't format when it's a string 'Present' to avoid error */}
            {field.value && field.value !== 'Present' ? (
              format(selectedDate!, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return;
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            field.onChange(`${yyyy}-${mm}-${dd}`);
          }}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
