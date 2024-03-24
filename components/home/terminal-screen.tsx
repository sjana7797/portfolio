"use client";

import { useTerminal } from "~/hooks/termminal-command";
import { cn } from "~/lib/utils";
import { useEffect, useMemo, useRef } from "react";

type Props = {};

function TerminalScreen({}: Props) {
  const { terminalMessages } = useTerminal();

  const bottomElement = useRef<HTMLDivElement | null>(null);

  const messageLength = useMemo(
    () => terminalMessages.length,
    [terminalMessages]
  );

  useEffect(() => {
    if (!bottomElement.current) return;
    bottomElement.current.scrollIntoView();
  }, [terminalMessages.length]);

  return (
    <section className="bg-gray-900 rounded-md border-2 w-full grow shadow max-h-[calc(100vh-150px)]">
      <ul className="p-4 flex flex-col max-h-full overflow-y-auto scroll-smooth scrollbar-hide text-lg">
        {terminalMessages.map((message, index) => {
          return (
            <li
              className={cn(
                "px-4 py-2 rounded-md",
                message.type === "bot"
                  ? "text-gray-300 mt-0.5"
                  : "text-cyan-400 mt-5"
              )}
              key={message.id}
            >
              {index === messageLength - 1 && <div ref={bottomElement} />}
              <code>
                <span className="text-pink-500 mr-2">
                  {message.type === "bot" ? ">" : "$"}
                </span>
                {message.message}
              </code>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default TerminalScreen;
