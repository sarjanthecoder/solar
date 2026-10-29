from PIL import Image

src = Image.open('C:/Users/sarja/.gemini/antigravity-ide/brain/434f24a6-19f0-4832-a1b5-7f08e5a8c85a/.user_uploaded/media_1793104952058.jpg')
w, h = src.size

# 1. Clean hero right scene (House + Parliament + Indian Flag)
# Avoid the 'dy' text at X < 418.
hero = src.crop((416, 36, 1024, 290))
hero_2x = hero.resize((hero.width * 2, hero.height * 2), Image.Resampling.LANCZOS)
hero_2x.save('public/images/subsidy-hero-scene.jpg', quality=95)

# 2. House thumbnail for Card 1 (Subsidy for Residential Solar)
# Crop house without the text "ojana" on the left: X: 195 to 305, Y: 298 to 376
house_thumb = src.crop((195, 298, 305, 376))
house_thumb_2x = house_thumb.resize((house_thumb.width * 2, house_thumb.height * 2), Image.Resampling.LANCZOS)
house_thumb_2x.save('public/images/subsidy-house-thumb.jpg', quality=95)

# 3. Solar Engineers photo for bottom banner
# In bottom banner: The engineers are on the right side.
# Let's crop from X: 740 to 990, Y: 452 to 572
# Avoid the 'WhatsApp Us' pill which is at X < 740
engineers = src.crop((740, 452, 990, 572))
engineers_2x = engineers.resize((engineers.width * 2, engineers.height * 2), Image.Resampling.LANCZOS)
engineers_2x.save('public/images/subsidy-engineers-cta.jpg', quality=95)

print("Clean subsidy assets generated successfully!")
