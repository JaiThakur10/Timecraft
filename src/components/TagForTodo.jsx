import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const TAGS = [
  { name: "Important", color: "bg-red-500" },
  { name: "Family", color: "bg-blue-500" },
  { name: "Priority", color: "bg-yellow-500" },
  { name: "Deadline", color: "bg-purple-500" },
  { name: "Work", color: "bg-green-500" },
  { name: "Health", color: "bg-teal-500" },
];

const TagForTodo = ({ selectedTag, onSelectTag }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-purple-300 border-gray-300 w-full"
        >
          {selectedTag ? (
            <>
              <span className={`w-3 h-3 rounded-full ${selectedTag.color}`} />
              {selectedTag.name}
            </>
          ) : (
            "Select Tag"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2">
        <div className="flex flex-col gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag.name}
              className={`flex items-center gap-2 p-2 rounded-md text-sm  hover:bg-gray-100 w-full ${
                selectedTag?.name === tag.name ? "font-bold" : ""
              }`}
              onClick={() => onSelectTag(tag)}
            >
              <span className={`w-3 h-3 rounded-full ${tag.color}`} />
              {tag.name}
              {selectedTag?.name === tag.name && <Check size={14} />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TagForTodo;
