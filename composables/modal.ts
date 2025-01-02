import { useState } from "#app";
import { useId } from "vue";

export const useModal = (key?: string, initialStatus: boolean = false) => {
  key ??= useId();

  const visible = useState(`NUXT_MODAL_${key}`, () => initialStatus);
  const toggle = (value?: boolean) => {
    if (typeof value === "undefined") visible.value = !visible.value;
    else visible.value = value;
  };
  const open = () => toggle(true);
  const close = () => toggle(false);

  return { visible, key, open, close, toggle };
};
