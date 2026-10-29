from PIL import Image

src = Image.open('C:/Users/sarja/.gemini/antigravity-ide/brain/434f24a6-19f0-4832-a1b5-7f08e5a8c85a/.user_uploaded/media_1793110257603.jpg')
w, h = src.size
print(f"Source size: {w}x{h}")

# 1. Hero House on the right
# Y: 42 to 290, X: 520 to 985
hero_house = src.crop((520, 42, 985, 290))
hero_house_2x = hero_house.resize((hero_house.width * 2, hero_house.height * 2), Image.Resampling.LANCZOS)
hero_house_2x.save('public/images/services-hero-house.jpg', quality=95)
print("Saved services-hero-house.jpg")

# 2. 8 Service Card Thumbnails:
# Row 1 (Y ~ 335 to 435):
# Card 1 (Residential): X: 48 to 138, Y: 335 to 435
s1 = src.crop((48, 335, 138, 435))
s1.resize((s1.width * 2, s1.height * 2), Image.Resampling.LANCZOS).save('public/images/srv-thumb-1-residential.jpg', quality=95)

# Card 2 (Commercial): X: 280 to 365, Y: 335 to 435
s2 = src.crop((280, 335, 365, 435))
s2.resize((s2.width * 2, s2.height * 2), Image.Resampling.LANCZOS).save('public/images/srv-thumb-2-commercial.jpg', quality=95)

# Card 3 (Industrial): X: 510 to 602, Y: 335 to 435
s3 = src.crop((510, 335, 602, 435))
s3.resize((s3.width * 2, s3.height * 2), Image.Resampling.LANCZOS).save('public/images/srv-thumb-3-industrial.jpg', quality=95)

# Card 4 (On-Grid): X: 745 to 830, Y: 335 to 435
s4 = src.crop((745, 335, 830, 435))
s4.resize((s4.width * 2, s4.height * 2), Image.Resampling.LANCZOS).save('public/images/srv-thumb-4-ongrid.jpg', quality=95)

# Row 2 (Y ~ 455 to 555):
# Card 5 (Off-Grid): X: 48 to 138, Y: 455 to 555
s5 = src.crop((48, 455, 138, 555))
s5.resize((s5.width * 2, s5.height * 2), Image.Resampling.LANCZOS).save('public/images/srv-thumb-5-offgrid.jpg', quality=95)

# Card 6 (Hybrid): X: 280 to 365, Y: 455 to 555
s6 = src.crop((280, 455, 365, 555))
s6.resize((s6.width * 2, s6.height * 2), Image.Resampling.LANCZOS).save('public/images/srv-thumb-6-hybrid.jpg', quality=95)

# Card 7 (Maintenance & Cleaning): X: 510 to 602, Y: 455 to 555
s7 = src.crop((510, 455, 602, 555))
s7.resize((s7.width * 2, s7.height * 2), Image.Resampling.LANCZOS).save('public/images/srv-thumb-7-maintenance.jpg', quality=95)

# Card 8 (Inverter & Battery Solutions): X: 745 to 830, Y: 455 to 555
s8 = src.crop((745, 455, 830, 555))
s8.resize((s8.width * 2, s8.height * 2), Image.Resampling.LANCZOS).save('public/images/srv-thumb-8-storage.jpg', quality=95)

print("All 8 service thumbnails saved successfully!")
