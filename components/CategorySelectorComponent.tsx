"use client"
import { Check, ChevronsUpDownIcon } from "lucide-react"

import {cn} from "@/lib/utils"
import { Category } from "@/sanity.types"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"


interface CategorySelectorComponentProps {
  categories: Category[]
}


function CategorySelectorComponent({ categories }: CategorySelectorComponentProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>("")
  const router = useRouter() 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-start text-xs font-normal"
        >
          {value ? categories.find(category => category._id === value)?.title : "Select a category"}
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..."
          className="h-9"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const selectedCategory = categories.find((c) => c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
            )
            if (selectedCategory?.slug?.current) {
              setValue(selectedCategory._id)
              setOpen(false)
              router.push(`/categories/${selectedCategory.slug.current}`)
            }
            }
          }} 
          />
          <CommandList>
            <CommandEmpty>No category found</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem key={category._id} value={category.title} onSelect={() => {
                  setValue(value === category._id ? "" : category._id)
                  setOpen(false)
                  router.push(`/categories/${category.slug?.current}`)
                }}>
                  {category.title}
                  <Check className={cn("ml-auto h-4 w-4", value === category._id ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent> 
    </Popover>
  )

}

export default CategorySelectorComponent