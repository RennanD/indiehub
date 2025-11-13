import type { SVGProps } from "react";

export interface AndroidProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
  videoSrc?: string;
}

export function Android() {
  return (
    <div className="relative mx-auto border-border bg-background border-14 rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-accent top-0 rounded-lg left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[46px] w-[3px] bg-accent absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-accent absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-accent absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-3xl overflow-hidden w-[272px] h-[572px] bg-background"></div>
    </div>
  );
}
