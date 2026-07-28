import { Calculator } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { TdeeCalculator } from "@/components/tools/TdeeCalculator";
import { OneRepMaxCalculator } from "@/components/tools/OneRepMaxCalculator";
import { ProteinCalculator } from "@/components/tools/ProteinCalculator";

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow-sm">
        <Calculator className="h-5 w-5" aria-hidden />
      </span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Calculators
      </h1>
      <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-300">
        Quick, standalone tools — no account needed. Numbers update as you type.
      </p>

      <div className="mt-8">
        <Tabs
          tabs={[
            { id: "tdee", label: "Calorie (TDEE)", content: <TdeeCalculator /> },
            { id: "1rm", label: "1-Rep Max", content: <OneRepMaxCalculator /> },
            { id: "protein", label: "Protein Target", content: <ProteinCalculator /> },
          ]}
        />
      </div>
    </div>
  );
}
