import { formOptions } from "@tanstack/react-form";

import type { User } from "@/types";

const defaultUser: User = {
  name: "",
  email: "",
  message: "",
};

export const formOpts = formOptions({
  defaultValues: defaultUser,
});
