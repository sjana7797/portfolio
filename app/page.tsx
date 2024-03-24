import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import TerminalBox from "~/components/home/terminal-box";
import TerminalScreen from "~/components/home/terminal-screen";

export default function Home() {
  return (
    <main className="fixed bottom-0 left-0 right-0 top-0  flex flex-col gap-y-4 p-2">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <Link
          className="flex w-fit shrink-0 items-center gap-x-2 rounded-md bg-white px-3 py-2 text-slate-900"
          href="/home"
        >
          <span>
            <PanelsTopLeft className="h-4 w-4" />
          </span>
          <span>Switch to GUI</span>
        </Link>

        <h1 className="mr-3 font-medium">Welcome User, I am Sanjay Jana</h1>
      </div>
      <TerminalScreen />
      <TerminalBox />
    </main>
  );
}
