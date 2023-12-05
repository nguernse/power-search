import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import {
  useSearchContext,
  useSearchDispatch,
} from "@/lib/context/searchContext";
import { Button } from "./ui/Button";
import { LapTimerIcon } from "@radix-ui/react-icons";

type Props = {
  asButton?: boolean;
};

export default function AutoSaveHistorySwitch({ asButton = false }: Props) {
  const dispatch = useSearchDispatch();
  const state = useSearchContext();

  return asButton ? (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        dispatch({
          type: "UPDATE_AUTO_SAVE_SETTING",
          payload: !state.settings.autoSaveHistory,
        });
      }}
    >
      <LapTimerIcon className="w-4 h-4 mr-2" />
      Auto-save searches
    </Button>
  ) : (
    <>
      <Switch
        id="auto-save"
        checked={state.settings.autoSaveHistory}
        onCheckedChange={(checked: boolean) => {
          dispatch({
            type: "UPDATE_AUTO_SAVE_SETTING",
            payload: checked,
          });
        }}
      />
      <Label htmlFor="auto-save">Auto-save searches</Label>
    </>
  );
}
