interface ProgressProps {
  data: { name: string; percent?: number };
}

const Progress = ({ data }: ProgressProps) => {
  const { name, percent = 0 } = data;
  const normalizedPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className='grid grid-cols-[minmax(0,8rem)_minmax(3rem,1fr)_2.75rem] items-center gap-3'>
      <div className='min-w-0 break-words text-sm text-[var(--text-primary)]'>
        {name}
      </div>
      <div
        className='h-1.5 overflow-hidden rounded-full bg-[var(--surface-3)]'
        role='progressbar'
        aria-label={`${name} activity`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(normalizedPercent)}
      >
        <span
          className='block h-full rounded-full bg-[var(--circuit-500)] transition-[width] duration-200 motion-reduce:transition-none'
          style={{ width: `${normalizedPercent}%` }}
        />
      </div>
      <div className='text-right font-code text-xs text-[var(--text-tertiary)]'>
        {normalizedPercent.toFixed(0)}%
      </div>
    </div>
  );
};

export default Progress;
