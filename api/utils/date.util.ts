import dayjs from "dayjs";

/**
 * 날짜 출력 데이터 포맷 변환
 * @param{Date} date 날짜 Date 객체
 * @param{string?} type 변환할 날짜 형태
 * @returns string
 */
export const formattedDate = (date: Date, type = "YMDHms") => {
  switch (type) {
    case "YMDHms":
      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    default:
      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  }
};

/**
 * 금일 날짜 범위 가져오기
 * @returns Object
 */
export const getTodayDateRange = () => {
  const todayStartAt = new Date(new Date().setHours(0, 0, 0, 0));
  const todayEndAt = new Date(new Date().setHours(23, 59, 59, 999));
  return {
    todayStartAt: todayStartAt,
    todayEndAt: todayEndAt,
  };
};
