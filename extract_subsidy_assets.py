from PIL import Image

src = Image.open('C:/Users/sarja/.gemini/antigravity-ide/brain/434f24a6-19f0-4832-a1b5-7f08e5a8c85a/.user_uploaded/media_1793104952058.jpg')
w, h = src.size
print(f"Source size: {w}x{h}")

# 1. Hero Right Scene: The Parliament + Luxury Villa + Garden
# In the mockup:
# Y from 36 to 290 (top banner)
# X from 390 to 1024
# Let's crop it and upscale 2x using Lanczos
hero_right = src.crop((390, 36, 1024, 290))
hero_right_2x = hero_right.resize((hero_right.width * 2, hero_right.height * 2), Image.Resampling.LANCZOS)
hero_right_2x.save('public/images/subsidy-hero-scene.jpg', quality=95)
print("Saved subsidy-hero-scene.jpg")

# 2. House Thumbnail in Card 1 ("Subsidy for Residential Solar")
# In Card 1: X from 170 to 300, Y from 292 to 380
# Let's crop the house with solar panels
house_thumb = src.crop((175, 298, 305, 375))
house_thumb_2x = house_thumb.resize((house_thumb.width * 2, house_thumb.height * 2), Image.Resampling.LANCZOS)
house_thumb_2x.save('public/images/subsidy-house-thumb.jpg', quality=95)
print("Saved subsidy-house-thumb.jpg")

# 3. Bottom CTA Solar Engineers Photo:
# In bottom banner: X from 720 to 1000, Y from 450 to 572
engineers = src.crop((720, 455, 990, 570))
engineers_2x = engineers.resize((engineers.width * 2, engineers.height * 2), Image.Resampling.LANCZOS)
engineers_2x.save('public/images/subsidy-engineers-cta.jpg', quality=95)
print("Saved subsidy-engineers-cta.jpg")

# 4. Ashoka Lion Capital Emblem in PM Surya Ghar Card
# Card is at X from 860 to 985, Y from 125 to 260
# The emblem is around X: 900 to 945, Y: 135 to 195
emblem = src.crop((900, 137, 945, 195))
emblem_2x = emblem.resize((emblem.width * 2, emblem.height * 2), Image.Resampling.LANCZOS)
emblem_2x.save('public/images/ashoka-emblem.png')
print("Saved ashoka-emblem.png")

print("All subsidy assets extracted successfully!")
