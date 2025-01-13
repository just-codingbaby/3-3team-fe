import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SORT_OPTS } from '@/constants/martket';

export default function SortBtn({sortOptionKey, setSortOptionKey}) {
  const keys = Array.from(SORT_OPTS.keys());
  const currentSortOpt = SORT_OPTS.get(sortOptionKey);

  return (
    <Select value={sortOptionKey}
            onValueChange={(value) => setSortOptionKey(value)}>
      <SelectTrigger className="border w-[130px] tb:w-[180px]">
        <SelectValue aria-label={currentSortOpt.label}
                     defaultValue={sortOptionKey}>
          {currentSortOpt.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {keys.map((key) => (
          <SelectItem key={key} value={key}>
            {SORT_OPTS.get(key).label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}