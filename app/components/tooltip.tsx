import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  tooltipTxt: string;
}

function Tooltip({ children, tooltipTxt }: TooltipProps) {
  return (
    <div className="group ">
      <span className="invisible absolute bg-white text-black group-hover:visible z-50 rounded shadow-lg p-1 -mt-8 ml-8">
        {tooltipTxt}
      </span>
      {children}
    </div>
  );
}

export default Tooltip;
