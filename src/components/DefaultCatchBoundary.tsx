import { RefreshCcwIcon } from "lucide-react";

import { m } from "@/paraglide/messages";

export function DefaultCatchBoundary() {
  return (
    <div className="mx-auto max-w-180 p-10 text-center md:p-20">
      <h1 className="mb-4 font-bold text-xl md:text-3xl">{m.server_error_title()}</h1>
      <p className="mb-7 md:mb-9">{m.server_error_desc()}</p>
      <div>
        <button
          type="button"
          className="btn-primary mx-auto flex max-w-max items-center justify-center gap-2"
          onClick={() => window.location.reload()}
        >
          <RefreshCcwIcon />
          {m.server_error_button()}
        </button>
      </div>
    </div>
  );
}
