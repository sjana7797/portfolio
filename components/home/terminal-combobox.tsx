"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";
import { Command } from "./type";
import { terminalCommands, clear } from "./constants";
import { useTerminal } from "~/hooks/termminal-command";

function TerminalCombobox() {
  const [selected, setSelected] = useState<Command | null>(terminalCommands[0]);
  const [query, setQuery] = useState("");
  const { addCommand, clearCommands } = useTerminal();

  const filteredCommand =
    query === ""
      ? terminalCommands
      : terminalCommands.filter((command) =>
          command.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full grow">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative bg-gray-950 w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
            <Combobox.Button className={"w-full"}>
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-200 focus:ring-0 bg-transparent outline-none"
                displayValue={(command: Command | null) =>
                  command ? command.name : ""
                }
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    !terminalCommands.find(
                      (command) => event.currentTarget.value === command.name
                    ) ||
                    !selected
                  )
                    return;
                  if (event.key === "Enter") {
                    if (selected.id === clear.id) {
                      clearCommands();
                    } else {
                      addCommand(selected);
                    }
                    setSelected(null);
                  }
                }}
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm bottom-[calc(100%+16px)] bg-gray-800">
              {filteredCommand.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCommand.map((command) => (
                  <Combobox.Option
                    key={command.id}
                    className={({ active }) =>
                      cn(
                        "relative select-none py-2 cursor-pointer pl-10 pr-4 text-white",
                        active && "bg-teal-600"
                      )
                    }
                    value={command}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {command.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default TerminalCombobox;
