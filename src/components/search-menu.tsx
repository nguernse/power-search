"use client";

import { useState } from "react";
import {
  CheckCircledIcon,
  DotsVerticalIcon,
  LightningBoltIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  useSearchContext,
  useSearchDispatch,
} from "@/lib/context/SearchProvider";

export function SearchMenu() {
  const { selectedShortcut, shortcuts } = useSearchContext();
  const dispatch = useSearchDispatch();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <DotsVerticalIcon className="mr-1 h-4 w-4" />
          More
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Search</DropdownMenuLabel>
          <DropdownMenuItem>
            <div className="rounded-full bg-emerald-600 mr-2">
              <CheckCircledIcon className="h-4 w-4 text-white" />
            </div>
            {shortcuts[selectedShortcut].name}
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <LightningBoltIcon className="mr-2 h-4 w-4" />
              Choose shortcut
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Filter shortcut..."
                  autoFocus={true}
                />
                <CommandList>
                  <CommandEmpty>No shortcut found.</CommandEmpty>
                  <CommandGroup>
                    {Object.keys(shortcuts).map((shortcut) => (
                      <CommandItem
                        key={shortcut}
                        value={shortcut}
                        onSelect={(value) => {
                          dispatch({
                            type: "SET_SELECTED_SHORTCUT",
                            payload: value,
                          });
                          setOpen(false);
                        }}
                      >
                        <div
                          className={cn(
                            "mr-2 bg-emerald-600 rounded-full",
                            selectedShortcut === shortcut
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        >
                          <CheckCircledIcon className="h-4 w-4 text-white" />
                        </div>
                        {shortcuts[shortcut].name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Links</DropdownMenuLabel>
          <DropdownMenuItem>
            <LightningBoltIcon className="mr-2 h-4 w-4" />
            <Link href="/shortcuts" className="w-full">
              Manage shortcuts
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            <Link href="/settings" className="w-full">
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
