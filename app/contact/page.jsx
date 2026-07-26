export const metadata = {
  title: "문의하기",
  description: "제미테스트 운영자에게 문의하는 방법을 안내합니다.",
};

export default function ContactPage() {
  return (
    <div className="doc">
      <p className="page-eyebrow">CONTACT</p>
      <h1 className="page-title">문의하기</h1>

      <p>
        사이트에 대한 문의, 콘텐츠 관련 의견, 오류 제보, 제휴 문의 등은 아래
        이메일로 보내주시면 확인 후 답변드리겠습니다.
      </p>

      <h2>이메일</h2>
      <p>
        <a href="mailto:leethyeen09@gmail.com">leethyeen09@gmail.com</a>
      </p>

      <h2>답변 안내</h2>
      <ul>
        <li>보통 영업일 기준 3일 이내에 답변드립니다.</li>
        <li>
          콘텐츠 수정 요청이나 저작권 관련 문의는 해당 페이지 주소를 함께
          보내주시면 처리가 빠릅니다.
        </li>
        <li>
          개인정보 관련 요청(열람, 삭제 등)도 이 주소로 접수받고 있습니다.
        </li>
      </ul>
    </div>
  );
}
