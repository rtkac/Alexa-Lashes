import { Avatar, AvatarFallback, AvatarImage } from '@alexa-lashes/ui/shadcn';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  const { user } = Route.useRouteContext();

  return (
    <div className="grid lg:grid-cols-2">
      <div className="rounded-md border border-primary-light bg-white p-6 dark:border-tertiary-light dark:bg-tertiary">
        <h1 className="mb-5 font-bold text-lg md:text-2xl">Profile</h1>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <p>{user.name}</p>
          </div>
          <p>
            <strong>Email:</strong>&nbsp;{user.email}
          </p>
          <p>
            <strong>Created At:</strong>&nbsp;
            {new Intl.DateTimeFormat('sk-SK').format(new Date(user.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_protected/dashboard/profile')({
  component: RouteComponent,
});
