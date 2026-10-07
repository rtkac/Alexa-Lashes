import { m } from '@/paraglide/messages';

type ProgramEvent = {
  time: string;
  title: string;
  lead?: string;
  description?: string;
  items?: string[];
};

type ProgramDay = {
  number: string;
  title: string;
  events: ProgramEvent[];
};

const days = (): ProgramDay[] => [
  {
    number: '01',
    title: m.training_basic_day_1_title(),
    events: [
      { time: '10:00', title: m.training_basic_day_1_event_1() },
      {
        time: '10:15',
        title: m.training_basic_day_1_event_2(),
        lead: m.training_basic_day_1_event_2_desc(),
        items: [
          m.training_basic_day_1_event_2_item_1(),
          m.training_basic_day_1_event_2_item_2(),
          m.training_basic_day_1_event_2_item_3(),
          m.training_basic_day_1_event_2_item_4(),
          m.training_basic_day_1_event_2_item_5(),
          m.training_basic_day_1_event_2_item_6(),
        ],
      },
      { time: '13:00', title: m.training_basic_day_1_event_3() },
      {
        time: '13:30',
        title: m.training_basic_day_1_event_4(),
        lead: m.training_basic_day_1_event_4_desc(),
        items: [
          m.training_basic_day_1_event_4_item_1(),
          m.training_basic_day_1_event_4_item_2(),
          m.training_basic_day_1_event_4_item_3(),
        ],
      },
      { time: '17:00', title: m.training_basic_day_1_event_5() },
    ],
  },
  {
    number: '02',
    title: m.training_basic_day_2_title(),
    events: [
      { time: '10:00', title: m.training_basic_day_2_event_1() },
      { time: '12:00', title: m.training_basic_day_2_event_2() },
      { time: '12:30', title: m.training_basic_day_2_event_3() },
      {
        time: '12:45',
        title: m.training_basic_day_2_event_4(),
        description: m.training_basic_day_2_event_4_desc(),
      },
      { time: '16:30', title: m.training_basic_day_2_event_5() },
      { time: '17:00', title: m.training_basic_day_2_event_6() },
    ],
  },
];

export const Program = () => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {days().map((day) => (
        <div className="card p-8 md:p-10" key={day.number}>
          <h3 className="mb-10 flex items-center font-bold text-lg uppercase">
            <span
              className="mr-3 flex size-10 shrink-0 items-center justify-center rounded-md bg-primary p-1 text-primary-ink tabular-nums"
              aria-hidden="true"
            >
              {day.number}
            </span>
            {day.title}
          </h3>
          <ol className="flex flex-col gap-7">
            {day.events.map((event) => (
              <li className="flex gap-6 sm:gap-14" key={event.time}>
                <time className="w-11 shrink-0 font-bold text-foreground tabular-nums">
                  {event.time}
                </time>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">{event.title}</span>
                  {event.lead && (
                    <p className="font-semibold text-neutral-700 text-sm">{event.lead}</p>
                  )}
                  {event.description && (
                    <p className="text-neutral-500 text-sm">{event.description}</p>
                  )}
                  {event.items && (
                    <ul className="ml-4 list-disc text-neutral-500 text-sm">
                      {event.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};
