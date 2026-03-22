interface InitiativeCardProps {
  title: string;
  description: string;
}

export default function InitiativeCard({ title, description }: InitiativeCardProps) {
  return (
    <div className="bg-white w-[353px] h-[158px] p-[30px] rounded-sm shadow-[0px_4px_20px_0px_rgba(0,55,85,0.1)] flex flex-col justify-between">
      <h3 className="font-bold text-[#003755] font-proxima text-[18px] leading-[130%] uppercase">
        {title}
      </h3>
      <p className="text-gray-500 font-proxima font-normal text-[14px] leading-[160%]">
        {description}
      </p>
    </div>
  );
}
