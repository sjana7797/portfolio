import { SendHorizontal, Terminal } from "lucide-react";
import TerminalCombobox from "./terminal-combobox";

type Props = {};

function TerminalBox({}: Props) {
  return (
    <section className="h-14 shrink-0 bg-gradient-to-tr to-cyan-600 via-emerald-600 from-pink-600 rounded-md p-1 flex justify-center items-center shadow">
      <div className="bg-gray-950 rounded-md w-full h-full flex items-center px-2 gap-x-2">
        <Terminal className="w-5" />
        <TerminalCombobox />
        <SendHorizontal className="shrink-0 w-5 h-5" />
      </div>
    </section>
  );
}

export default TerminalBox;
