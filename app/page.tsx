import { PanelsTopLeft } from "lucide-react";
import TerminalBox from "~/components/home/terminal-box";
import TerminalScreen from "~/components/home/terminal-screen";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col gap-y-4 p-2">
      <div className="flex items-center sm:flex-row flex-col justify-between">
        <Button className="shrink-0 w-fit gap-x-2">
          <span>
            <PanelsTopLeft className="w-4 h-4" />
          </span>
          <span>Switch to GUI</span>
        </Button>

        <h1 className="mr-3 font-medium">Welcome User, I am Sanjay Jana</h1>
      </div>
      <TerminalScreen />
      <TerminalBox />
    </main>
  );
}
