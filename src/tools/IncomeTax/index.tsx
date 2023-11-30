"use client";
import TabContainer from "@/components/dashboard/tabs/TabContainer";
import Title from "@/components/shared/Title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { parseToEuro } from "@/lib/money";
import { cn } from "@/lib/utils";


export const ResultRow = ({
  label,
  value,
  className,
  valueClassName,
}: {
  label: string;
  value: number;
  className?: string;
  valueClassName?: string;
}) => {
  return (
    <li className={cn("flex justify-between items-center", className)}>
      <span className="text-lg">{label}</span> <span className={cn("font-serif text-2xl", valueClassName)}>{parseToEuro(value)}</span>
    </li>
  )
}

const IncomeTax = () => {
  return (
    <TabContainer value="inkomsten-belasting" title="Inkomsten Belasting">
      <p>
        Voor ondernemers en zelfstandigen zonder personeel (zzp&apos;ers) kan
        het soms ingewikkeld zijn om te bepalen hoeveel geld ze moeten
        reserveren voor de inkomstenbelasting. Deze tool biedt een schatting om
        je hierbij te helpen. Hoewel de tool niet alle aspecten omvat en een
        vereenvoudigde berekening biedt voor gebruiksgemak, is het een stap
        voorwaarts ten opzichte van simpelweg &apos;houd maar 40% apart&apos;.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="max-w-xl space-y-2">
          <Title type='h4'>Gegevens</Title>

          <div className="flex gap-3 w-full">
            <div className=" w-full">
              <Label htmlFor="omzet" className="text-md">Omzet</Label>
              <Input type="number" placeholder="Omzet" name="omzet" defaultValue={0} />
            </div>
            <div>
              <Label htmlFor="omzet" className="text-md">Jaar</Label>
              <Select defaultValue="2023">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Jaar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="items-center flex space-x-2 pt-6">
            <Checkbox id="terms1" />
            <label
              htmlFor="terms1"
              className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Heb je meer dan 1225 uur gewerkt aan je onderneming?
            </label>
          </div>

          <div className="items-center flex space-x-2 pt-6">
            <Checkbox id="terms1" />
            <label
              htmlFor="terms1"
              className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Heb je recht op startersaftrek?
            </label>
          </div>

          <div className="items-center flex space-x-2 pt-6">
            <Checkbox id="terms1" />
            <label
              htmlFor="terms1"
              className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Heb je in loondienst gewerkt dit jaar?
            </label>
          </div>

          <div className="w-3/5 pt-4">
            <Label htmlFor="loon_jaaropgave" className="text-md">Loon volgens jaaropgave</Label>
            <Input type="number" placeholder="Loon volgens jaaropgave" name="loon_jaaropgave" defaultValue={0} />
          </div>

          <div className="w-3/5">
            <Label htmlFor="loonheffing" className="text-md">Ingehouden loonheffing</Label>
            <Input type="number" placeholder="Ingehouden loonheffing" name="loonheffing" defaultValue={0} />
          </div>
        </div>
        <div className="max-w-xl space-y-2">
          <Title type='h4'>Resultaat</Title>

          <ul className="px-2 flex flex-col gap-1">
            <ResultRow label="Winst uit onderneming" value={0} />
            <ResultRow label="Af: Ondernemersaftrek" value={0} />
            <ResultRow label="Af: Mkb-winstvrijstelling" value={0} />
            <ResultRow label="Bij: Loon" value={0} />
            <ResultRow label="Belastbaar inkomen" value={0} />
            <ResultRow label="Inkomstenbelasting (Schijf 1 t/m 4)" value={0} />
            <ResultRow label="Algemene heffingskorting" value={0} />
            <ResultRow label="Arbeidskorting" value={0} />
            <ResultRow label="Af: Heffingskortingen" value={0} />
            <hr className=" my-2 border-theme-secondary" />
            <ResultRow className={"font-bold"} label="Te betalen Inkomstenbelasting" value={0} />
            <ResultRow className={"font-bold"} label="Te betalen bijdrage zorgverzekeringswet" value={0} />
          </ul>
        </div>
      </div>
    </TabContainer>
  );
};

export default IncomeTax;
