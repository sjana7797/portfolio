import Image from "next/image";

type Props = { img: string };

function Mobile({ img }: Props) {
  return (
    <div className="relative mx-auto h-[600px] w-[300px] scale-50 rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-800 shadow-xl dark:border-gray-800">
      <div className="absolute left-1/2 top-0 h-[18px] w-[148px] -translate-x-1/2 rounded-b-[1rem] bg-gray-800"></div>
      <div className="absolute -left-[17px] top-[124px] h-[46px] w-[3px] rounded-l-lg bg-gray-800"></div>
      <div className="absolute -left-[17px] top-[178px] h-[46px] w-[3px] rounded-l-lg bg-gray-800"></div>
      <div className="absolute -right-[17px] top-[142px] h-[64px] w-[3px] rounded-r-lg bg-gray-800"></div>
      <div className="h-[572px] w-[272px] overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800">
        <Image width={272} height={572} src={img} alt="" />
      </div>
    </div>
  );
}

export default Mobile;
