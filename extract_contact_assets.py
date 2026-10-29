from PIL import Image

src = Image.open('C:/Users/sarja/.gemini/antigravity-ide/brain/434f24a6-19f0-4832-a1b5-7f08e5a8c85a/.user_uploaded/media_1793108199836.jpg')
w, h = src.size
print(f"Source size: {w}x{h}")

# 1. Hero House on the right
# Y: 42 to 290, X: 520 to 865
hero_house = src.crop((520, 42, 865, 290))
hero_house_2x = hero_house.resize((hero_house.width * 2, hero_house.height * 2), Image.Resampling.LANCZOS)
hero_house_2x.save('public/images/contact-hero-house.jpg', quality=95)
print("Saved contact-hero-house.jpg")

# 2. Map Image (Column 1):
# In 1024x576 source:
# X: 36 to 395, Y: 352 to 552
map_crop = src.crop((36, 352, 395, 552))
map_crop.resize((map_crop.width * 2, map_crop.height * 2), Image.Resampling.LANCZOS).save('public/images/contact-map.jpg', quality=95)
print("Saved contact-map.jpg")

# 3. Solar Expert Agent Photo (Top Right Card):
# X: 865 to 985, Y: 352 to 452
expert = src.crop((865, 355, 983, 452))
expert.resize((expert.width * 2, expert.height * 2), Image.Resampling.LANCZOS).save('public/images/contact-expert-agent.jpg', quality=95)
print("Saved contact-expert-agent.jpg")

# 4. Site Visit Technician Photo (Bottom Right Card):
# X: 885 to 985, Y: 460 to 555
tech = src.crop((885, 460, 985, 555))
tech.resize((tech.width * 2, tech.height * 2), Image.Resampling.LANCZOS).save('public/images/contact-site-visit-eng.jpg', quality=95)
print("Saved contact-site-visit-eng.jpg")

print("All contact visual assets extracted successfully!")
