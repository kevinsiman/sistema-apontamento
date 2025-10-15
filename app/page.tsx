import { MachineList } from "./components/appointment/machine-list";
import { Provider } from "./contexts/Provider";
import { machineList } from "./libs/mock";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-zinc-900 text-white space-y-12">
      <MachineList machines={machineList} />
    </div>
  );
}
