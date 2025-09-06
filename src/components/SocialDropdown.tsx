'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CirclePlus } from 'lucide-react';
import type { SocialLink } from './forms/ContactForm';

interface SocialDropdownProps {
  socialLinks: SocialLink[];
  updateSocialLinks: (link: SocialLink) => void;
}

export function SocialDropdown({ socialLinks, updateSocialLinks }: SocialDropdownProps) {
  console.log('🚀 ~ SocialDropdown ~ socialLinks:', socialLinks);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <CirclePlus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-max flex gap-1">
        {socialLinks.map((link: SocialLink, index: number) => {
          const IconComp = link.icon;

          return (
            <>
              <DropdownMenuItem
                key={link.platform}
                onSelect={() => {
                  updateSocialLinks(link);
                }}
              >
                {IconComp}
              </DropdownMenuItem>

              {index < socialLinks.length - 1 && (
                <DropdownMenuSeparator className="bg-muted h-5 w-[2px]" />
              )}
            </>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
