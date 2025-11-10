import { CreateProfileForm } from "./create-profile-form";

export function CreateProfileSection() {
  return (
    <section className="flex flex-1 pb-20 pt-5 md:pt-20">
      <div className="w-full max-w-5xl mx-auto px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center text-center">
          <h1 className="text-2xl font-bold md:text-3xl">Criar perfil</h1>
          <p className="text-text-muted text-lg max-w-[510px]">
            Crie seu perfil para começar a compartilhar seus projetos com o
            mundo.
          </p>
        </div>

        <CreateProfileForm />
      </div>
    </section>
  );
}
