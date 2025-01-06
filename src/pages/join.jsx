import React, { useState } from "react";

const Join = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* 로고 */}
      <img
        src="/images/main_logo.png"
        alt="Logo"
        className="mb-12 w-[330.82px] h-auto"
      />

      <div className="w-full max-w-[520px] bg-black p-8 rounded-lg">
        <form className="text-left">
          {/* 이메일 입력 */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해 주세요"
              className="w-full h-[60px] px-4 border border-gray-200 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 "
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              비밀번호
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              className="w-full h-[60px] px-4 pr-12 border border-gray-200 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 "
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute flex right-5 top-0.5 mt-10 items-center justify-center "
              style={{ width: "24px", height: "24px" }}
            >
              <img
                src={
                  showPassword
                    ? "/images/type=visible.png" // 눈 떠진 아이콘 경로
                    : "/images/type=invisible.png" // 눈 감긴 아이콘 경로
                }
                alt="Toggle Password Visibility"
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full h-[60px] bg-customMain text-black font-semibold  hover:bg-customMain/80 transition"
          >
            로그인
          </button>
        </form>

        {/* 회원가입 안내문 (중앙 정렬) */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          최애의 포토가 처음이신가요?{" "}
          <a href="/signup" className="text-customMain underline hover:no-underline">
            회원가입하기
          </a>
        </p>
      </div>
    </div>
  );
};

export default Join;
