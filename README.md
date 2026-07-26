# 제미테스트 (zemitest.com)

성향 테스트 모음 사이트. Next.js App Router 기반.

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

- [x] 운영자 소개 / 이메일 / 시행일 채움
- [ ] `app/layout.jsx` 의 metadataBase 를 실제 도메인으로 변경
- [x] 테스트 3개 완성 (연애 20문항 / 경제력 24문항 / 정치 30문항)
- [ ] 테스트 5~6개까지 늘리기 (전생, 스트레스 남음)
- [ ] 글 8~10개까지 늘리기
- [ ] Google Search Console 등록 + 색인 확인

## 테스트 추가하는 법

1. `lib/새테스트.js` — 문항/결과 데이터
2. `components/새테스트.jsx` — `QuizShell`의 Intro/QuestionCard/Bar 재사용
3. `app/tests/새경로/page.jsx` — 페이지
4. `lib/tests.js` 에 한 줄 추가 → 홈에 자동 노출
5. `app/sitemap.js` 의 staticPages 에 경로 추가

## 검색엔진 등록

`app/layout.jsx` 의 verification 항목에 코드를 넣으면 됨:
- google: 구글 서치콘솔 HTML 태그 방식의 content 값
- naver-site-verification: 네이버 서치어드바이저 값
