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
- [x] 글 10편 완료 (전부 공백제외 1,500자 이상)
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

## 썸네일 / 아이콘 다시 만들기

`tools-make-og.py` 가 OG 썸네일 생성 스크립트입니다.
테스트를 추가하면 이 파일의 ITEMS 목록에 한 줄 추가하고 실행하면 됩니다.

```bash
pip install Pillow
python3 tools-make-og.py
```

Pretendard 폰트 경로는 스크립트 상단 FONT_DIR 에서 바꿀 수 있습니다.
결과물은 public/og/ 에 저장됩니다.

## 결과 통계 켜기 (Upstash Redis)

통계 기능은 저장소가 연결됐을 때만 표시됩니다. 연결 전에도 사이트는 정상
동작하며 통계 영역만 보이지 않습니다.

1. Vercel 프로젝트 → Storage 탭 → Create Database
2. Upstash for Redis 선택 (무료 플랜 있음)
3. 프로젝트에 Connect — 환경변수가 자동 주입됩니다
   - UPSTASH_REDIS_REST_URL
   - UPSTASH_REDIS_REST_TOKEN
4. Vercel 에서 Redeploy 하면 통계가 켜집니다

로컬 테스트는 .env.local 에 위 두 값을 넣으면 됩니다.

### 저장 구조
- 키: stats:{테스트명} (해시)
- 필드: 유형 키 / 값: 누적 횟수
- 개인정보는 저장하지 않고 유형별 누적 카운트만 기록합니다.
- 허용된 테스트/유형 값만 기록되도록 서버에서 검증합니다.

## 결과 이미지 저장

html-to-image 로 결과 카드를 PNG 로 내보냅니다.
인스타그램은 웹 공유 API 를 제공하지 않아 캡처가 유일한 공유 수단이므로
이 버튼이 그 과정을 대신합니다.

## 댓글 기능

설정 방법은 COMMENTS.md 를 참고하세요.
필요 환경변수: ADMIN_TOKEN, IP_SALT (+ Upstash Redis)
관리 화면: /admin/comments

## 카카오톡 공유 설정

1. developers.kakao.com 접속 → 카카오 계정으로 로그인
2. 내 애플리케이션 → 애플리케이션 추가하기 (앱 이름: 제미테스트)
3. 만든 앱 → 앱 키 → **JavaScript 키** 복사
4. 앱 설정 → 플랫폼 → Web 플랫폼 등록 → 사이트 도메인에 https://zemitest.com 추가
5. Vercel → Settings → Environment Variables 에 추가:
   - NEXT_PUBLIC_KAKAO_KEY = (JavaScript 키)
6. Redeploy

설정 전에는 카카오톡 버튼이 표시되지 않고, 나머지 공유 기능은 정상 동작합니다.

## 상위 % 계산 방식

점수형 테스트는 결과에 「상위 X%」를 크게 보여주고 등급을 옆에 붙입니다.

- 고정 기준 분포(평균 58점·표준편차 16점)에 점수를 대입해 백분위를 구합니다.
- 참여자 수와 무관하게 첫날부터 일관되고, 1점 차이도 구분됩니다.
- 만점에 가까우면 상위 0.4% 처럼 소수점까지 표시합니다.
- 등급은 내신 비율(상위 4/11/23/40/60/77/89/96%)을 그대로 따릅니다.
- 실제 참여자 데이터는 계속 모으고, 10,000명이 넘으면 결과 하단에 참여자 수와
  평균을 참고용으로 덧붙입니다. 표본이 적을 때의 숫자는 의미가 없어 기준을
  높게 잡았습니다.

관련 코드: lib/grade.js, components/ScoreResult.jsx
