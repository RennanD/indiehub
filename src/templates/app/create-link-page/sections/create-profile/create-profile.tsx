import { CreateProfileForm } from "./create-profile-form";

export function CreateProfileSection() {
  return (
    <section className="flex flex-1 pb-20 pt-5 md:pt-20">
      <div className="w-full max-w-5xl mx-auto px-5 flex flex-col gap-10">
        <CreateProfileForm />
      </div>
    </section>
  );
}
