from PIL import Image

src = Image.open('C:/Users/sarja/.gemini/antigravity-ide/brain/434f24a6-19f0-4832-a1b5-7f08e5a8c85a/.user_uploaded/media_1793109215657.jpg')
w, h = src.size
print(f"Source size: {w}x{h}")

# 1. Hero House on the right
# Crop house from banner: X from 505 to 865, Y from 42 to 285
hero_house = src.crop((505, 42, 865, 285))
hero_house_2x = hero_house.resize((hero_house.width * 2, hero_house.height * 2), Image.Resampling.LANCZOS)
hero_house_2x.save('public/images/project-hero-villa.jpg', quality=95)
print("Saved project-hero-villa.jpg")

# 2. 4 Project Cards Photos:
# Row 1 card image area (inside cards):
# Card 1 (Coimbatore): X: 50 to 270, Y: 330 to 415
c1 = src.crop((50, 330, 270, 415))
c1.resize((c1.width * 2, c1.height * 2), Image.Resampling.LANCZOS).save('public/images/project-card-1.jpg', quality=95)

# Card 2 (Chennai): X: 280 to 500, Y: 330 to 415
c2 = src.crop((280, 330, 500, 415))
c2.resize((c2.width * 2, c2.height * 2), Image.Resampling.LANCZOS).save('public/images/project-card-2.jpg', quality=95)

# Card 3 (Hosur): X: 510 to 730, Y: 330 to 415
c3 = src.crop((510, 330, 730, 415))
c3.resize((c3.width * 2, c3.height * 2), Image.Resampling.LANCZOS).save('public/images/project-card-3.jpg', quality=95)

# Card 4 (Erode): X: 740 to 960, Y: 330 to 415
c4 = src.crop((740, 330, 960, 415))
c4.resize((c4.width * 2, c4.height * 2), Image.Resampling.LANCZOS).save('public/images/project-card-4.jpg', quality=95)

# 3. Bottom CTA engineer and landscape photo:
# X: 500 to 1024, Y: 495 to 576
cta_eng = src.crop((500, 495, 1024, 576))
cta_eng.resize((cta_eng.width * 2, cta_eng.height * 2), Image.Resampling.LANCZOS).save('public/images/project-cta-engineer.jpg', quality=95)

print("All exact project visual assets extracted successfully!")
