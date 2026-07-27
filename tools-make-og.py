"""
OG 썸네일 생성기 (1200 x 630)

카톡/인스타/트위터에 링크를 붙였을 때 뜨는 미리보기 이미지를 만듭니다.
런타임에 폰트를 불러오는 방식은 배포 환경에서 한글이 깨질 위험이 있어,
빌드 전에 PNG로 만들어 /public/og/ 에 넣는 방식을 씁니다.
"""

from PIL import Image, ImageDraw, ImageFont
import os, math

W, H = 1200, 630
FONT_DIR = "/home/claude/fonts/pretendard/public/static/alternative"
BLACK = f"{FONT_DIR}/Pretendard-Black.ttf"
BOLD = f"{FONT_DIR}/Pretendard-Bold.ttf"
SEMI = f"{FONT_DIR}/Pretendard-SemiBold.ttf"
MED = f"{FONT_DIR}/Pretendard-Medium.ttf"
EMOJI = "/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf"

OUT = "/home/claude/love-universe/public/og"
os.makedirs(OUT, exist_ok=True)


def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def radial_bg(img, c_outer, c_mid, c_inner):
    """사이트와 같은 위쪽 방사형 그라데이션."""
    d = ImageDraw.Draw(img)
    co, cm, ci = hex2rgb(c_outer), hex2rgb(c_mid), hex2rgb(c_inner)
    cx, cy = W / 2, -H * 0.15
    maxd = math.hypot(max(cx, W - cx), H - cy)
    for y in range(H):
        # 행 단위로 근사 (세로 방향 변화가 지배적)
        dist = min(1.0, math.hypot(0, y - cy) / maxd)
        if dist < 0.5:
            t = dist / 0.5
            c = tuple(int(ci[i] + (cm[i] - ci[i]) * t) for i in range(3))
        else:
            t = (dist - 0.5) / 0.5
            c = tuple(int(cm[i] + (co[i] - cm[i]) * t) for i in range(3))
        d.line([(0, y), (W, y)], fill=c)


def add_stars(img, n=90, seed=7):
    import random
    rnd = random.Random(seed)
    d = ImageDraw.Draw(img, "RGBA")
    for _ in range(n):
        x, y = rnd.uniform(0, W), rnd.uniform(0, H)
        r = rnd.uniform(1.0, 2.6)
        a = int(rnd.uniform(60, 210))
        d.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, a))


def draw_emoji(img, ch, size, xy):
    """컬러 이모지는 고정 크기(109px)만 지원되므로 렌더 후 리사이즈."""
    try:
        f = ImageFont.truetype(EMOJI, 109)
        layer = Image.new("RGBA", (160, 160), (0, 0, 0, 0))
        ImageDraw.Draw(layer).text((10, 10), ch, font=f, embedded_color=True)
        layer = layer.crop(layer.getbbox() or (0, 0, 160, 160))
        ratio = size / max(layer.width, layer.height)
        layer = layer.resize(
            (max(1, int(layer.width * ratio)), max(1, int(layer.height * ratio))),
            Image.LANCZOS,
        )
        img.paste(layer, (int(xy[0]), int(xy[1])), layer)
        return layer.width, layer.height
    except Exception as e:
        print("  이모지 렌더 실패:", e)
        return 0, 0


def wrap_ko(text, font, max_w, draw):
    """한국어는 어절(띄어쓰기) 단위로 줄바꿈."""
    words = text.split(" ")
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def make(filename, eyebrow, title, sub, emoji, accent, bg=("#322659", "#443180", "#5e40a4")):
    img = Image.new("RGB", (W, H))
    radial_bg(img, *bg)
    add_stars(img)
    d = ImageDraw.Draw(img, "RGBA")

    # 좌측 강조 바
    d.rounded_rectangle([0, 0, 14, H], radius=0, fill=hex2rgb(accent))

    PAD_L = 86
    # 이모지 (우측 큰 장식)
    if emoji:
        draw_emoji(img, emoji, 250, (W - 330, H / 2 - 125))

    MAX_W = W - PAD_L - 340

    # 제목 크기를 3줄 이내로 맞춤
    size = 76
    while size > 44:
        f_title = ImageFont.truetype(BLACK, size)
        lines = wrap_ko(title, f_title, MAX_W, d)
        if len(lines) <= 3:
            break
        size -= 6
    f_title = ImageFont.truetype(BLACK, size)
    lines = wrap_ko(title, f_title, MAX_W, d)

    f_eye = ImageFont.truetype(BOLD, 26)
    f_sub = ImageFont.truetype(SEMI, 30)
    sub_lines = wrap_ko(sub, f_sub, MAX_W, d)[:2] if sub else []

    # 전체 블록 높이를 재서 세로 중앙 정렬
    line_h = int(size * 1.26)
    block_h = 38 + 22 + len(lines) * line_h + (18 + len(sub_lines) * 44 if sub_lines else 0)
    y = int((H - 60 - block_h) / 2)

    d.text((PAD_L, y), eyebrow, font=f_eye, fill=hex2rgb(accent))
    y += 38 + 22

    for ln in lines:
        d.text((PAD_L, y), ln, font=f_title, fill=(255, 255, 255))
        y += line_h

    if sub_lines:
        y += 18
        for ln in sub_lines:
            d.text((PAD_L, y), ln, font=f_sub, fill=(214, 202, 245))
            y += 44

    # 하단 브랜드
    f_brand = ImageFont.truetype(BOLD, 27)
    d.text((PAD_L, H - 82), "제미테스트  ·  zemitest.com", font=f_brand, fill=(180, 165, 220))

    path = os.path.join(OUT, filename)
    img.save(path, "PNG", optimize=True)
    print(f"  {filename}  ({os.path.getsize(path)//1024}KB)")
    return path


ITEMS = [
    # 파일명, eyebrow, 제목, 부제, 이모지, 강조색
    ("default.png", "ZEMI TEST", "질문 몇 개로 나를 알아봅니다",
     "연애 · 전생 · 스트레스 · 정치 · 경제력 무료 테스트", "🧩", "#c9a5ff"),

    ("tests.png", "ALL TESTS", "무료 심리 테스트 모음",
     "가입 없이 바로 할 수 있는 5가지 테스트", "🗂️", "#ffd6a5"),

    ("love.png", "PERSONALITY TEST", "나의 연애 세계관은 어떤 우주일까?",
     "20문항 · 결과 6종 · 유형별 퍼센트까지", "💘", "#ff8ab5"),

    ("pastlife.png", "PAST LIFE TEST", "전생에 나는 무엇이었을까?",
     "28문항 · 결과 12종 · 전생의 인연까지", "🔮", "#c9a5ff"),

    ("animal.png", "ANIMAL TEST", "나와 닮은 동물은 무엇일까?",
     "27문항 · 결과 16종 · 강아지부터 독수리까지", "🐾", "#ffd6a5"),

    ("stress.png", "STRESS TYPE", "나는 스트레스를 어떻게 받아낼까?",
     "24문항 · 결과 8종 · 나만의 힐링 처방", "🌿", "#84fab0"),

    ("politics.png", "POLITICAL COMPASS", "나의 정치 성향 좌표는?",
     "30문항 · 2축 좌표 · 축별 퍼센트", "🗳️", "#8fd3f4"),

    ("money.png", "MONEY TEST", "나의 경제력은 몇 점일까?",
     "24문항 · 100점 만점 · 4개 영역 진단", "💰", "#ffd76f"),

    ("articles.png", "ARTICLES", "테스트 뒤에 있는 이야기",
     "심리와 성향에 대해 조금 더 깊이", "📖", "#ffb0d8"),
]

print("OG 썸네일 생성:")
for args in ITEMS:
    make(*args)
print(f"\n총 {len(ITEMS)}개 → {OUT}")
