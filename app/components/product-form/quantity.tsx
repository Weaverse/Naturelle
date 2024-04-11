interface QuantityProps {
  value: number;
  onChange: (value: number) => void;
}
export function Quantity(props: QuantityProps) {
  let {value, onChange} = props;
  let handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent the user from entering non-numeric characters
    if (
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      isNaN(Number(e.key))
    ) {
      e.preventDefault();
    }
  };
  return (
    <div className="space-y-1.5">
      <legend className="whitespace-pre-wrap max-w-prose font-bold text-lg leading-snug">
        Quantity
      </legend>
      <div className="w-fit flex gap-2">
        <button
          name="decrease-quantity"
          aria-label="Decrease quantity"
          className="transition py-3 px-5 border-2 rounded border-[#9AA473]"
          disabled={value <= 1}
          onClick={() => onChange(value - 1)}
        >
          <span>&#8722;</span>
        </button>
        <input
          className="py-3 w-24 text-center border-2 rounded border-[#9AA473]"
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => onChange(Number(e.currentTarget.value))}
        />
        <button
          className="transition py-3 px-5 border-2 rounded border-[#9AA473]"
          name="increase-quantity"
          aria-label="Increase quantity"
          onClick={() => onChange(value + 1)}
        >
          <span>&#43;</span>
        </button>
      </div>
    </div>
  );
}
