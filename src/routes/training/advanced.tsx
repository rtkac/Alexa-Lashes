import { createFileRoute } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/training/advanced")({
  head: () => ({
    meta: [
      {
        title: m.meta_training_advanced_title(),
      },
      {
        name: "description",
        content: m.meta_training_advanced_desc(),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/training/advanced"!</div>;
}
