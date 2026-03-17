import { m } from "@/paraglide/messages";

export const Program = () => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="rounded-md border border-primary-light bg-white p-10 dark:border-tertiary-light dark:bg-tertiary">
        <h3 className="mb-10 flex items-center font-bold text-lg uppercase">
          <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg border border-primary-light bg-primary p-1 text-white">
            01
          </span>
          {m.training_basic_day_1_title()}
        </h3>
        <div className="flex flex-col gap-7">
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">10:00</span>
            <span className="font-bold">{m.training_basic_day_1_event_1()}</span>
          </div>
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">10:15</span>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{m.training_basic_day_1_event_2()}</span>
              <p className="font-bold text-primary text-sm">
                {m.training_basic_day_1_event_2_desc()}
              </p>
              <ul className="ml-4 list-disc text-neutral-500 text-sm">
                <li>{m.training_basic_day_1_event_2_item_1()}</li>
                <li>{m.training_basic_day_1_event_2_item_2()}</li>
                <li>{m.training_basic_day_1_event_2_item_3()}</li>
                <li>{m.training_basic_day_1_event_2_item_4()}</li>
                <li>{m.training_basic_day_1_event_2_item_5()}</li>
                <li>{m.training_basic_day_1_event_2_item_6()}</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">13:00</span>
            <span className="font-bold">{m.training_basic_day_1_event_3()}</span>
          </div>
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">13:30</span>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{m.training_basic_day_1_event_4()}</span>
              <p className="font-bold text-primary text-sm">
                {m.training_basic_day_1_event_4_desc()}
              </p>
              <ul className="ml-4 list-disc text-neutral-500 text-sm">
                <li>{m.training_basic_day_1_event_4_item_1()}</li>
                <li>{m.training_basic_day_1_event_4_item_2()}</li>
                <li>{m.training_basic_day_1_event_4_item_3()}</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">17:00</span>
            <span className="font-bold">{m.training_basic_day_1_event_5()}</span>
          </div>
        </div>
      </div>
      <div className="rounded-md border border-primary-light bg-white p-10 dark:border-tertiary-light dark:bg-tertiary">
        <h3 className="mb-10 flex items-center font-bold text-lg uppercase">
          <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg border border-primary-light bg-primary p-1 text-white">
            02
          </span>
          {m.training_basic_day_2_title()}
        </h3>
        <div className="flex flex-col gap-7">
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">10:00</span>
            <span className="font-bold">{m.training_basic_day_2_event_1()}</span>
          </div>
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">12:00</span>
            <span className="font-bold">{m.training_basic_day_2_event_2()}</span>
          </div>
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">12:30</span>
            <span className="font-bold">{m.training_basic_day_2_event_3()}</span>
          </div>
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">12:45</span>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{m.training_basic_day_2_event_4()}</span>
              <p className="text-neutral-500 text-sm">{m.training_basic_day_2_event_4_desc()}</p>
            </div>
          </div>
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">16:30</span>
            <span className="font-bold">{m.training_basic_day_2_event_5()}</span>
          </div>
          <div className="flex gap-14">
            <span className="w-11 font-bold text-primary">17:00</span>
            <span className="font-bold">{m.training_basic_day_2_event_6()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
