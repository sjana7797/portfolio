"use client";

import { SendHorizontal, Terminal } from "lucide-react";
import TerminalCombobox from "./terminal-combobox";
import { useState } from "react";
import { Command } from "./type";
import { clear, terminalCommands } from "./constants";
import { useTerminal } from "~/hooks/termminal-command";

type Props = {};

function TerminalBox({}: Props) {
  const [selected, setSelected] = useState<Command | null>(terminalCommands[0]);
  const { addCommand, clearCommands } = useTerminal();

  const handleSendMessage = () => {
    if (!selected) return;
    if (selected.id === clear.id) {
      clearCommands();
    } else {
      addCommand(selected);
    }
    setSelected(null);
  };

  return (
    <section className="h-14 shrink-0 bg-gradient-to-tr to-cyan-600 via-emerald-600 from-pink-600 rounded-md p-1 flex justify-center items-center shadow">
      <div className="bg-gray-950 rounded-md w-full h-full flex items-center px-2 gap-x-2">
        <Terminal className="w-5" />
        <TerminalCombobox selected={selected} setSelected={setSelected} />
        <SendHorizontal
          className="shrink-0 w-5 h-5"
          onClick={handleSendMessage}
        />
      </div>
    </section>
  );
}

export default TerminalBox;
