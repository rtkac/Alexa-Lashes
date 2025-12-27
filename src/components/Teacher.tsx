import { m } from "@/paraglide/messages";

const Teacher = () => {
  return (
    <div className="space-y-7 rounded-md border border-primary-light bg-white px-5 py-8 text-center md:flex md:space-y-0 md:p-10 md:text-left dark:border-tertiary-light dark:bg-tertiary">
      <div className="mx-auto h-35 w-35 overflow-hidden rounded-full md:mr-8 md:ml-0">
        <img src="/home/1.jpg" alt="2" className="h-full w-full object-cover" />
      </div>
      <div className="md:max-w-120">
        <h2 className="font-bold text-primary text-sm">{m.teacher_title()}</h2>
        <h3 className="mt-2 mb-3 font-bold text-xl md:mt-2 md:text-2xl">{m.teacher_name()}</h3>
        <p className="text-neutral-500 text-sm dark:text-amber-50">{m.teacher_desc()}</p>
      </div>
    </div>
  );
};
export default Teacher;
