import tail from "@/styles/tailwindcss";
import { Btn } from "./buyer";
import Link from "next/link";
import { Title } from "@/pages/salesphotocard/detailsalesphotocard";

export function CloseBtn({ position, onClose }) {
  const closeBtn = `absolute top-1/2 left-1/2 w-6 h-[2px] bg-customGrey01 transform -translate-x-1/2 -translate-y-1/2`;
  return (
    <button
      className={`absolute ${position} bg-transparent border-[1px] border-transparent cursor-pointer`}
      onClick={onClose}
    >
      <span class={`${closeBtn} rotate-45`}></span>
      <span class={`${closeBtn} -rotate-45`}></span>
    </button>
  );
}

export function BorderBtn({ children, ma, href, onClick }) {
  const { flexcenter } = tail;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${flexcenter} ${ma} w-[440px] h-[60px] border border-white`}
    >
      <span className={`text-lg text-white font-medium`}>{children}</span>
    </Link>
  );
}

// 구매/교환제시 성공,실패
export function ModalContent({
  modalbox,
  onClose,
  text = "",
  state,
  btnText = "",
  children,
  href = "#",
}) {
  const { dimbg, flexcenter } = tail;

  return (
    <div className={`${dimbg} bg-opacity-100`}>
      <div className={`${modalbox}  ${flexcenter} flex-col relative`}>
        <CloseBtn position={`top-0 right-0`} onClose={onClose} />
        <h3 className={`text-xl font-baskin font-bold text-white mt-[80px]`}>
          <span className="text-white  text-[46px] font-bold mr-[10px]">
            {text}
          </span>
          <span
            className={`${
              state ? "text-customMain" : "text-customGrey01"
            }  text-[46px] font-bold`}
          >
            {/* if (state) '성공' else '실패' */}
            {state ? "성공" : "실패"}
          </span>
        </h3>
        <span className={`text-white font-bold text-xl mt-[40px]`}>
          {children}
        </span>
        <BorderBtn href={href} ma="mt-[60px]">
          {btnText}
        </BorderBtn>
      </div>
    </div>
  );
}

// 포토카드 구매 모달, 교환 제시 취소
export default function ModalStandard({
  className,
  modalbox,
  modaltitle,
  modaltext,
  closeposition,
  onClick,
  onClose,
}) {
  const { dimbg, flexcenter, stitle } = tail;

  return (
    <div className={`${dimbg} bg-opacity-80`}>
      <div className={`${modalbox}  ${flexcenter} flex-col relative`}>
        <h3 className={`${stitle} font-sans text-white mt-[80px]`}>
          {modaltitle}
        </h3>
        <span className={`text-white text-[16px] font-normal mt-[40px]`}>
          {modaltext}
        </span>
        <CloseBtn
          position={`${closeposition} top-[46px] right-[46px]`}
          onClose={onClose}
        />
        <Btn
          btname="구매하기"
          className="w-[170px] h-[60px] mt-[60px] mb-[60px] text-lg"
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export function ModalExchange({ modalbox, children, onClose }) {
  const { dimbg } = tail;

  return (
    <div className={`${dimbg}  bg-opacity-80`}>
      <div
        className={`${modalbox} mx-auto bg-[#161616] relative border border-white`}
      >
        <CloseBtn
          position="top-[150px] right-[180px] absolute"
          onClose={onClose}
        />
        <div className={`max-w-[920px] mx-auto bg-[#161616] `}>
          <Title
            location="마이갤러리"
            title="포토카드 교환하기"
            className="mb-[20px]"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
