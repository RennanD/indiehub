import { Input } from "@/components/ui/input";

export function CreateProfileForm() {
  return (
    <form className="flex bg-foreground flex-col gap-10 p-6 md:p-10 rounded-lg border border-text-muted/20">
      <h2 className="text-2xl font-bold">Vamos começar!</h2>
      <p className="text-text-muted text-lg">Digite como quer que seu</p>
      <div className="flex flex-col gap-2">
        <label htmlFor="link">Como quer que seu link seja exibido?</label>
        <Input
          id="link"
          placeholder="my-projects"
          prefix="https://indiehub.site/"
        />
      </div>
    </form>
  );
}
