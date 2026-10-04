"use client";


export function MainContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden pb-16 md:pb-0 min-w-0">
      {children}
    </div>
  );
}
