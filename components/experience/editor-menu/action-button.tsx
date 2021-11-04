import Image from 'next/image';

interface IActionButtonProps {
  color: ActionButtonColor,
  icon: JSX.Element,
  mouseIcon?: string,
  active?: boolean,
  onClick: () => void
}

export enum ActionButtonColor {
  Red = "from-red-300 to-red-500 hover:from-red-500 hover:to-red-700",
  Green = "from-green-300 to-green-500 hover:from-green-400 hover:to-green-700",
  Blue = "from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-700",
  Gray = "from-gray-300 to-gray-500 hover:from-gray-500 hover:to-gray-700"
}

export const ActionButton = ({ color, icon, mouseIcon, active = false, onClick }: IActionButtonProps) => (
  <button onClick={onClick} className={`bg-gradient-to-br ${color} ${active ? 'opacity-100' : 'opacity-40'} btn h-16 w-16 md:h-24 md:w-24 rounded-xl shadow-xl relative above-canvas`}>
    {icon}
    {mouseIcon &&
      <div className="relative left-8 top-7 w-6 h-6 hidden md:block">
        <Image src={`/${mouseIcon}.svg`} layout='fill' alt={mouseIcon} />
      </div>
    }
  </button>
);
