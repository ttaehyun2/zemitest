import AdminComments from "../../../components/AdminComments";

// 관리 화면은 검색엔진에 노출되면 안 됩니다
export const metadata = {
  title: "댓글 관리",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <AdminComments />;
}
