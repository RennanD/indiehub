import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileData = {
  name: string;
  description: string;
  avatar: string;
};

export function ProfileSection({ profileData }: { profileData: ProfileData }) {
  return (
    <section className="flex max-w-sm">
      <div className="flex flex-col w-full md:w-fit items-center md:items-start">
        <Avatar className="size-20 md:size-40">
          <AvatarImage
            sizes="100%"
            className="object-cover"
            src={profileData.avatar}
            alt={profileData.name}
          />
          <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl text-center font-bold mt-8 mb-2">
          {profileData.name}
        </h1>
        <p className="text-sm text-muted-foreground text-center md:text-left">
          {profileData.description}
        </p>
      </div>
    </section>
  );
}
