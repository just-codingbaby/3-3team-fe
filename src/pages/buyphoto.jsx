import tail from "@/styles/tailwindcss";
import { Children, useState } from "react";
import { useRouter } from "next/router";
import Buyer, { Btn, Gradetitle } from "@/components/buyer";
import { ExchangeDetail, ModalExchange, Ex } from "@/components/modal";
import ModalStandard from "@/components/modal";
import { ExchangeList } from "@/components/modal";
import PageHeader, { DetailPheader } from "@/components/market/PageHeader";

//Ex컴포넌트 부분 다 갈아끼워야 함

export function Title({ location, title, className, children }) {
  const { marketlogo, titles, afborder } = tail;
  return (
    <div className={`${className} mb-[60px]`}>
      <div className={`${marketlogo}`}>{location}</div>
      <h2 className={`${titles} ${afborder} text-white`}>{title}</h2>
      {children}
    </div>
  );
}

export default function Salesphotocard() {
  const { flexcenter, pointtext, flexstanderd, btnabsol } = tail;
  const router = useRouter();
  const { name } = router.query;

  const [example, setExample] = useState({
    // title: "우리집 앞마당",
    rating: "LEGENDARY",
    buyphoto: 2,
  });

  // 원래 모달 기능 해뒀던거
  const [isModal, setIsModal] = useState(false);
  const [isExchangeModal, setIsExchangeModal] = useState(false);
  const openModal = () => setIsModal(true);
  const closeModal = () => {
    setIsModal(false);
    setIsExchangeModal(false);
  };

  const openExchangeModal = () => {
    setIsExchangeModal(true);
  };

  //실험 2
  const [modalType, setModalType] = useState({
    standard: null,
    cancel: "cancel",
    close: "close",
  }); // 모달 상태

  const OM = (type) => {
    setModalType(type);
  };

  const CM = (type) => {
    setModalType(type);
  };

  //example.title
  return (
    <div>
      <div className={`max-w-[1480px] w-full mx-auto tablet:max-w-[704px]`}>
        {/* <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="교환 제시 취소"
          modaltext={`[${example.rating} | ${example.title}] ${example.buyphoto}장을 구매하시겠습니까?`}
          // onClick={BuyModalOpen}
          // onClose={closeModal}
        /> */}
        <Title location="마켓플레이스" title={name} />
        <div className={`flex justify-between tablet:mt-[40px]`}>
          <div
            className={`relative w-full max-w-[960px]  h-[720px] tablet:max-w-[342px] tablet:h-[256px] overflow-hidden`}
          >
            <img
              src="/images/type=sample_img1.png"
              className={`w-[960px] h-[720px] tablet:w-[342px] tablet:h-[256px] absolute object-cover`}
            />
          </div>
          <Buyer
            nickname="미쓰손"
            content="우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. "
            price="4"
            buyphoto="2"
            totalphoto="5"
          />
        </div>
        <div className={`${flexstanderd} relative`}>
          <Title title="교환 희망 정보" className="mt-[120px] w-full">
            <Btn
              className="w-[440px] h-[60px] text-lg bottom-[80px]"
              absolute={btnabsol}
              onClick={openModal}
            >
              포토카드 교환하기
            </Btn>
          </Title>
          {isModal && (
            <ModalExchange
              modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
              onClose={closeModal}
            >
              {" "}
              <Title
                location="마이갤러리"
                title="포토카드 교환하기"
                className="mb-[20px]"
              />
              <div className={``}>
                <DetailPheader />
                <div className={`${flexstanderd} justify-between`}>
                  {/* 이 부분 갈아끼워야 함 */}
                  <Ex
                    onClick={openExchangeModal}
                    className={`w-[440px] h-[600px] mt-[40px] border border-white`}
                  />
                  {isExchangeModal && <ExchangeDetail onClose={closeModal} />}
                  <Ex
                    className={`w-[440px] h-[600px] mt-[40px] border border-white`}
                  />
                </div>
              </div>
            </ModalExchange>
          )}
        </div>
        <p className={`text-white ${pointtext}`}>
          푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.
          나중에 뚫어야할 부분임
        </p>
        <Gradetitle
          rating="RARE"
          type="풍경"
          className="mt-[20px] mb-[180px]"
        />
        {/* 실험중 */}
        <ExchangeList onClick={() => OM("cancel")} />
        {modalType === "cancel" && (
          <ModalStandard
            modalbox="w-[560px] h-[352px] bg-[#161616]"
            modaltitle="교환 제시 취소"
            modaltext={`[${example.rating} | ${example.title}] 교환 제시를 취소하시겠습니까?`}
            onClose={() => CM("close")}
          >
            <Btn
              className="w-[170px] h-[60px] mt-[60px] mb-[60px] text-lg text-[#0F0F0F]"
              onClick={() => CM("close")}
            >
              취소하기
            </Btn>
          </ModalStandard>
        )}
      </div>
    </div>
  );
}
