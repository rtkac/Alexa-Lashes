import { createFileRoute } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/privacy-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2.5 font-bold text-2xl md:text-4xl">{m.privacy_policy_title()}</h1>
      <h2 className="mt-6 mb-2.5 font-bold text-xl">{m.privacy_policy_1_title()}</h2>
      <p>{m.privacy_policy_1_desc()}</p>
      <h2 className="mt-6 mb-2.5 font-bold text-xl">{m.privacy_policy_2_title()}</h2>
      <p>{m.privacy_policy_2_desc_1()}</p>
      <p>{m.privacy_policy_2_desc_2()}</p>
      <p>{m.privacy_policy_2_desc_3()}</p>
      <p>{m.privacy_policy_2_desc_4()}</p>
      <p>{m.privacy_policy_2_desc_5()}</p>
      <h2 className="mt-6 mb-2.5 font-bold text-xl">{m.privacy_policy_3_title()}</h2>
      <p>{m.privacy_policy_3_desc()}</p>
      <ul className="list-inside list-disc">
        <li>{m.privacy_policy_3_list_1()}</li>
        <li>{m.privacy_policy_3_list_2()}</li>
        <li>{m.privacy_policy_3_list_3()}</li>
      </ul>
      <h2 className="mt-6 mb-2.5 font-bold text-xl">{m.privacy_policy_4_title()}</h2>
      <p>{m.privacy_policy_4_desc_1()}</p>
      <ul className="list-inside list-disc">
        <li>{m.privacy_policy_4_list_1()}</li>
        <li>{m.privacy_policy_4_list_2()}</li>
      </ul>
      <p>{m.privacy_policy_4_desc_2()}</p>
      <p>{m.privacy_policy_4_desc_3()}</p>
      <h2 className="mt-6 mb-2.5 font-bold text-xl">{m.privacy_policy_5_title()}</h2>
      <p>{m.privacy_policy_5_desc_1()}</p>
      <p>{m.privacy_policy_5_desc_2()}</p>
      <ul className="list-inside list-disc">
        <li>{m.privacy_policy_5_list_1()}</li>
        <li>{m.privacy_policy_5_list_2()}</li>
      </ul>
      <p>{m.privacy_policy_5_desc_3()}</p>
      <p>{m.privacy_policy_5_desc_4()}</p>
      <h2 className="mt-6 mb-2.5 font-bold text-xl">{m.privacy_policy_6_title()}</h2>
      <p>{m.privacy_policy_6_desc()}</p>
      <h2 className="mt-6 mb-2.5 font-bold text-xl">{m.privacy_policy_7_title()}</h2>
      <p>{m.privacy_policy_7_desc()}</p>
      <h2 className="mt-6 mb-2.5 font-bold text-xl">{m.privacy_policy_8_title()}</h2>
      <p>{m.privacy_policy_8_desc()}</p>
    </div>
  );
}
