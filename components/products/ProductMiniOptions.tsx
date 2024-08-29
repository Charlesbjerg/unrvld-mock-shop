import React from "react";

interface IProps {
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
}

export default function ProductMiniOptions({ options }: IProps) {
  return (
    <div className="mb-4">
      {options.map((optionGroup) => (
        <div key={optionGroup.id} className="">
          <p className="mb-2 text-sm">{optionGroup.name}s available:</p>
          <div className="flex gap-4 overflow-auto pb-4">
            {optionGroup.values.map((value, index) => (
              <OptionItem key={index} type={optionGroup.name} value={value} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// TODO: Refactor below into separate files
function OptionItem({ type, value }: { type: string; value: string }) {
  if (type === "Color") {
    return <ColorOption value={value} />;
  }
  return <TextOption value={value} />;
}

function ColorOption({ value }: { value: string }) {
  const colourMap: { [key: string]: string } = {
    Green: "#519872",
    Olive: "#5F7367",
    Ocean: "#3FA7D6",
    Purple: "#63458A",
    Red: "#A20021",
  };
  return (
    <i
      className="block w-4 h-4 rounded-full"
      style={{ backgroundColor: colourMap[value] }}
    ></i>
  );
}

function TextOption({ value }: { value: string }) {
  return <p className="text-xs whitespace-nowrap">{value}</p>;
}
