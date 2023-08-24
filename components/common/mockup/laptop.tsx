import Image from "next/image";

type Props = { img: string };

function Laptop({ img }: Props) {
  return (
    <div className="scale-75">
      <div className="relative mx-auto h-[172px] max-w-[301px] rounded-t-xl border-[8px] border-gray-900 bg-gray-800 dark:border-gray-800 md:h-[294px] md:max-w-[512px]">
        <div className="h-[156px] overflow-hidden rounded-lg bg-white dark:bg-gray-800 md:h-[278px]">
          <Image
            width={278}
            height={156}
            src={img}
            className="h-[156px] w-full rounded-xl md:h-[278px]"
            alt=""
          />
        </div>
      </div>
      <div className="relative mx-auto h-[17px] max-w-[351px] rounded-b-xl rounded-t-sm bg-gray-700 md:h-[21px] md:max-w-[597px]">
        <div className="absolute left-1/2 top-0 h-[5px] w-[56px] -translate-x-1/2 rounded-b-xl bg-gray-800 md:h-[8px] md:w-[96px]"></div>
      </div>
    </div>
  );
}

export default Laptop;
