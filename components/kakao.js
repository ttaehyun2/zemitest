// 카카오 SDK 로더
//
// SDK 를 모든 페이지에서 미리 불러오면 로딩이 느려지므로,
// 공유 버튼을 실제로 누를 때만 한 번 불러옵니다.

const SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
const SDK_INTEGRITY =
  "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";

let loading = null;

export function kakaoKey() {
  return process.env.NEXT_PUBLIC_KAKAO_KEY || "";
}

export function kakaoEnabled() {
  return Boolean(kakaoKey());
}

export function loadKakao() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Kakao?.isInitialized?.()) return Promise.resolve(window.Kakao);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const key = kakaoKey();
    if (!key) return resolve(null);

    const existing = document.querySelector(`script[src="${SDK_SRC}"]`);
    const onReady = () => {
      try {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(key);
        }
        resolve(window.Kakao || null);
      } catch (e) {
        reject(e);
      }
    };

    if (existing) {
      if (window.Kakao) onReady();
      else existing.addEventListener("load", onReady);
      return;
    }

    const s = document.createElement("script");
    s.src = SDK_SRC;
    s.integrity = SDK_INTEGRITY;
    s.crossOrigin = "anonymous";
    s.async = true;
    s.onload = onReady;
    s.onerror = () => reject(new Error("카카오 SDK 로드 실패"));
    document.head.appendChild(s);
  });

  return loading;
}
