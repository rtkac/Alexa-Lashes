import { createFileRoute } from "@tanstack/react-router";
import { useDictionary } from "react-intlayer";

import content from "@/contents/page.content";

export const Route = createFileRoute("/{-$locale}/services")({
  component: RouteComponent,
});

function RouteComponent() {
  const contents = useDictionary(content);

  return (
    <div>
      services page:
      <br />
      <div>{contents.title}</div>
    </div>
  );
}
