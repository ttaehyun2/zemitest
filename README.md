# 연애 세계관 (love-universe)

연애 심리 테스트 + 읽을거리 사이트. Next.js App Router 기반.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000

## 배포

1. GitHub에 이 폴더를 올린다
2. vercel.com 에서 GitHub 저장소를 연결한다
3. 산 도메인을 Vercel 프로젝트 설정에서 연결한다 (HTTPS 자동)

## 애드센스 신청 전 반드시 할 것

- [ ] `lib/articles.js` 안의 `type: "mine"` 블록 3개를 내 이야기로 교체
- [ ] `app/about/page.jsx` 운영자 소개 채우기
- [ ] `app/contact/page.jsx` 실제 이메일 넣기
- [ ] `app/privacy/page.jsx` 이메일, 시행일 채우기
- [ ] `app/layout.jsx` 의 metadataBase 를 실제 도메인으로 변경
- [ ] 테스트 최소 5~6개까지 늘리기 (홈의 "COMING SOON" 자리)
- [ ] 글 8~10개까지 늘리기
- [ ] Google Search Console 등록 + 색인 확인
