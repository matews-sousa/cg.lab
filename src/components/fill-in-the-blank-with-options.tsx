import { Button } from "./ui/button";
import { useFillInTheBlankWithOptionsStore } from "@/store/fillInTheBlankWithOptionsStore";

export default function FillInTheBlankWithOptions() {
  const { sentence, options, selectedValues, handleSelect, handleRemove } =
    useFillInTheBlankWithOptionsStore();

  return (
    <div className="text-lg md:text-2xl">
      {/* Sentence display with placeholders */}
      <div className="mb-4 space-x-2 flex flex-wrap justify-center items-center">
        {sentence.split(" ").map((part, index) => {
          const match = part.match(/{(.*?)}/); // Match placeholders like {id}
          if (match) {
            const id = match[1];
            return (
              <div
                key={id}
                className="border-b-2 w-24 border-zinc-900 py-1 self-end"
              >
                {selectedValues[id] ? (
                  <Button variant="secondary" onClick={() => handleRemove(id)}>
                    {selectedValues[id]}
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    disabled
                    className="text-gray-400 italic"
                  >
                    _
                  </Button>
                )}
              </div>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>

      {/* Options list */}
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map(option => {
          const isDisabled = Object.values(selectedValues).includes(
            option.value
          );
          return (
            <Button
              key={option.id}
              onClick={() => {
                const firstUnfilledId = sentence
                  .split(" ")
                  .map(part => part.match(/{(.*?)}/)?.[1]) // Extract IDs
                  .find(id => id && !selectedValues[id]);

                if (firstUnfilledId) {
                  handleSelect(firstUnfilledId, option.value);
                }
              }}
              disabled={isDisabled}
              className={`border border-gray-400 ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              variant="secondary"
            >
              {option.value}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
