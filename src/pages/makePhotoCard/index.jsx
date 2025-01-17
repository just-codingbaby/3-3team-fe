import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useState } from "react";
import { useRouter } from "next/router";

export default function MakePhotoCard() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const file = data.image;
    const jsonData = {
      name: data.name,
      description: data.description,
      grade: data.grade,
      genre: data.genre,
      price: data.price,
      quantity: data.quantity,
    };

    // FormData 생성
    const formData = new FormData();
    formData.append("file", file); // 파일 데이터 추가
    formData.append("data", JSON.stringify(jsonData)); // JSON 데이터 추가

    try {
      const response = await axios.post("/api/v1/users/my-cards", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (process.env.NODE_ENV === "development") {
        console.log("API 응답:", response.data);
      }

      router.push("/makePhotoCard/success");

      reset();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("API 요청 오류:", error);
        console.error("데이터 상태:", formData);
      }
      router.push("makePhotoCard/failed");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById("fileName").value = file.name; // 파일 이름 설정
      
      const newFileName = `file_${Date.now()}.${file.name.split(".").pop()}`; // 새 파일 이름 생성
      const renamedFile = new File([file], newFileName, { type: file.type });

      setValue("image", renamedFile);
    }
  };

  const FILTER_LIST = [
    {
      label: "등급을 선택해 주세요",
      category: "grade",
      options: [
        { value: "COMMON", label: "COMMON" },
        { value: "RARE", label: "RARE" },
        { value: "SUPER_RARE", label: "SUPER RARE" },
        { value: "LEGENDARY", label: "LEGENDARY" },
      ],
    },
    {
      label: "장르를 선택해 주세요",
      category: "genre",
      options: [
        { value: "LANDSCAPE", label: "풍경" },
        { value: "PORTRAIT", label: "인물" },
        { value: "ANIMAL", label: "동물" },
        { value: "STILL_LIFE", label: "정물" },
        { value: "ABSTRACT", label: "추상" },
      ],
    },
  ];

  const inputStyle =
    "border focus-visible:ring-0 focus-visible:ring-transparent bg-black focus-visible:ring-offset-0 w-[345px] h-[55] mb:w-[440px] tb:w-[520px] h-[60px]";
  const labelStyle = "font-bold text-xl leading-7";
  const divStyle = "flex flex-col gap-[10px]";
  const drpDownStyle =
    "border w-[345px] h-[55] mb:w-[440px] tb:w-[520px] h-[60px] bg-black";

  return (
    <div className="flex flex-col px-20 py-6 lt:px-55 lt:py-7">
      <h1 className="font-baskin font-normal lt:text-6xl mb:text-5xl hidden mb:flex border-b border-white pb-5">
        포토카드 생성
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-14 items-center mt-14"
      >
        <div className={divStyle}>
          <label className={labelStyle}>포토카드 이름</label>
          <Input
            {...register("name", {
              required: "필수 입력 사항입니다",
              maxLength: {
                value: 30,
                message: "최대 30자까지 입력 가능합니다",
              },
            })}
            className={`${
              errors.name ? "border-customRed" : "border-white"
            } ${inputStyle}`}
            placeholder="포토카드 이름을 입력해 주세요"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>등급</label>
          <Select
            key={FILTER_LIST[0].category}
            onValueChange={(value) => setValue("grade", value)}
          >
            <SelectTrigger className={drpDownStyle}>
              <SelectValue placeholder={FILTER_LIST[0].label} />
            </SelectTrigger>
            <SelectContent>
              {FILTER_LIST[0].options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>장르</label>
          <Select
            key={FILTER_LIST[1].category}
            onValueChange={(value) => setValue("genre", value)}
          >
            <SelectTrigger className={drpDownStyle}>
              <SelectValue placeholder={FILTER_LIST[1].label} />
            </SelectTrigger>
            <SelectContent>
              {FILTER_LIST[1].options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>가격</label>
          <Input
            {...register("price", { required: "필수 입력 사항입니다" })}
            className={`${inputStyle}`}
            placeholder="가격을 입력해 주세요"
          />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>총 발행량</label>
          <Input
            {...register("quantity", {
              required: "필수 입력 사항입니다",
              maxLength: {
                value: 30,
                message: "최대 30자까지 입력 가능합니다",
              },
            })}
            className={`${inputStyle}`}
            placeholder="총 발행량을 입력해 주세요"
          />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>사진 업로드</label>
          <div
            className={`flex flex-row justify-between w-[345px] h-[55px] mb:w-[440px] tb:w-[520px] m-0 p-0`}
          >
            <Input
              id="fileName"
              type="text"
              readOnly
              placeholder="사진 업로드"
              value={watch("image")?.name || "업로드를 해주세요"}
              className={`w-[310px] mb:w-[310px] tb:w-[390px] h-[55px] border focus-visible:ring-0 focus-visible:ring-transparent bg-black focus-visible:ring-offset-0`}
            />
            <button
              type="button"
              onClick={() => document.getElementById("file-input").click()}
              className="bg-black w-[105px] mb:w-[120px] h-[55px] px-4 py-2 rounded border border-customMain text-customMain text-base font-normal"
            >
              파일 선택
            </button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>포토카드 설명</label>
          <textarea
            {...register("description", {
              required: "설명을 입력해주세요.",
              maxLength: {
                value: 500,
                message: "설명은 최대 500자까지 작성 가능합니다.",
              },
            })}
            placeholder="카드 설명을 입력해 주세요"
            className="border rounded w-[345px] h-[180px] mb:w-[440px] tb:w-[520px] p-2 resize-none bg-black border-white outline-none"
          />
        </div>

        <PrimaryButton
          label={"생성하기"}
          className={"w-[345px] mb:w-[440px] tb:w-[520px] h-[60px]"}
          type="submit"
        />
      </form>
    </div>
  );
}
