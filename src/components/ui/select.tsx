import * as React from "react";

type SelectContextType = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextType>({});

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="w-full border rounded-md px-3 py-2 flex items-center bg-white">
      {children}
    </button>
  );
}

export function SelectValue({
  placeholder,
}: {
  placeholder?: string;
}) {
  const { value } = React.useContext(SelectContext);
  return (
    <span className="text-gray-500">
      {value ?? placeholder}
    </span>
  );
}

export function SelectContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute mt-1 w-full border rounded-md bg-white shadow">
      {children}
    </div>
  );
}

export function SelectGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { onValueChange } = React.useContext(SelectContext);

  return (
    <div
      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onValueChange?.(value)}
    >
      {children}
    </div>
  );
}