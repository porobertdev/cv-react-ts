'use client';

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CirclePlus } from 'lucide-react';

export function SocialDropdown(props) {
  const { socialLinks, updateSocialLinks } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {/* <img src={selectedSocialIcon.src} alt="brand logo" /> */}
          {/* <selectedSocialIcon/> */}
          {/* <IconComp /> */}
          <CirclePlus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-max flex">
        {/* <DropdownMenuLabel>Platform</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}

        {socialLinks.map((link) => {
          const IconComp = link.icon;

          return (
            <DropdownMenuItem
              key={link.name}
              onSelect={() => {
                updateSocialLinks(link);
              }}
            >
              <IconComp />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
