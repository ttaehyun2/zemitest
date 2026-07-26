import PoliticsTest from "../../../components/PoliticsTest";

export const metadata = {
  title: "정치 성향 좌표 테스트",
  description:
    "30문항으로 알아보는 나의 정치 성향. 경제(분배↔시장)와 사회(권위↔자유) 두 축의 좌표와 퍼센트로 확인해보세요.",
};

export default function PoliticsTestPage() {
  return <PoliticsTest />;
}
