import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFrameworkContext } from "../local-storage/local-storage";
import { cn } from "@/lib/utils";

export function SideBar({ onSidebarSelect }) {
  const { selectedFrameworks } = useFrameworkContext();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const frameworks = selectedFrameworks.map((item) => ({
    value: item,
    label: item,
  }));

  const handleFrameworkSelect = (framework) => {
    // Log the coordinates to the console
    const bada = { label: `City :${framework.label}`, value: localStorage.getItem(framework.value).replace(/"/g, '') }
    console.log("Coordinates:", bada);

    // Toggle the state to show/hide the CurrentWeather component
    onSidebarSelect(bada);

    setValue(framework.value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[253px] justify-between"
        >
          {value
            ? frameworks.find((fw) => fw.value === value)?.label
            : "Select City..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[253px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((fw) => (
              <CommandItem key={fw.value} onSelect={() => handleFrameworkSelect(fw)}

              >
                {!isObject(fw.value) && (
                  <>
                    {fw.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === fw.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function isObject(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
