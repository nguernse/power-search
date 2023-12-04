import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useSearchContext,
  useSearchDispatch,
} from "@/lib/context/searchContext";
import { Button } from "./ui/button";

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
