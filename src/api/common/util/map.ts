/**
 * data가 null이 아니라면 R를 반환한다.
 * @param data nullable한 데이터
 * @param mapper NonNullable한 데이터를 인자로 받아 변형하는 함수
 * @returns null or R
 */
export const map = <T, R>(
  data: T | null | undefined,
  mapper: (data: T) => R,
): null | R => {
  if (data == null) {
    return null;
  }
  return mapper(data);
};
