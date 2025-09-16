import { useResume } from '@/contexts/ResumeContext';
import { SettingsSchema, TemplateEnum, type SettingsType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export default function SettingsForm() {
  const { resumeData, updateResumeData } = useResume();
  const { settings } = resumeData;

  const form = useForm<SettingsType>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      ...settings,
    },
    mode: 'onChange',
  });

  const handleFormChange = () => {
    console.log('🚀 ~ handleFormChange ~ handleFormChange.settings:', settings);

    updateResumeData({ settings: form.getValues() });
  };

  return (
    <Form {...form}>
      <form onChange={handleFormChange}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {field.value || 'Select template'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      {Object.values(TemplateEnum.enum).map((level) => (
                        <DropdownMenuItem
                          key={level}
                          onSelect={() => {
                            field.onChange(level);
                            handleFormChange();
                          }}
                        >
                          {level}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
