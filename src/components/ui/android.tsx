import { cn } from "@/lib/utils";

interface AndroidProps {
  children: React.ReactNode;
  size?: "md" | "lg";
}
export function Android({ children, size = "md" }: AndroidProps) {
  const sizeClass = {
    md: "h-[600px] w-[300px]",
    lg: "h-[800px] w-[400px]",
  };

  return (
    <div
      className={cn(
        "relative mx-auto border-border overflow-hidden bg-background border-14 rounded-[2.5rem] shadow-xl",
        sizeClass[size],
      )}
    >
      <div className="h-[46px] w-[3px] bg-accent absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-accent absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-accent absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-3xl overflow-hidden flex flex-1 bg-background">
        {children}
      </div>
    </div>
  );
}
