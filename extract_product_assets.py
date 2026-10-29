from PIL import Image

src = Image.open('C:/Users/sarja/.gemini/antigravity-ide/brain/434f24a6-19f0-4832-a1b5-7f08e5a8c85a/.user_uploaded/media_1793108142580.jpg')
w, h = src.size
print(f"Source size: {w}x{h}")

# 1. Hero House on the right
# Crop Y: 42 to 290, X: 520 to 865
hero_house = src.crop((520, 42, 865, 290))
hero_house_2x = hero_house.resize((hero_house.width * 2, hero_house.height * 2), Image.Resampling.LANCZOS)
hero_house_2x.save('public/images/products-hero-house.jpg', quality=95)
print("Saved products-hero-house.jpg")

# 2. 6 Product Cards Thumbnails (Y ~ 495 to 630 normalized to 576):
# In 1024x576 source:
# Product row Y: 298 to 365
# Card 1 (Solar Panels): X: 37 to 180
p1 = src.crop((38, 298, 182, 365))
p1.resize((p1.width * 2, p1.height * 2), Image.Resampling.LANCZOS).save('public/images/prod-thumb-1-panels.jpg', quality=95)

# Card 2 (Inverters): X: 197 to 341
p2 = src.crop((198, 298, 342, 365))
p2.resize((p2.width * 2, p2.height * 2), Image.Resampling.LANCZOS).save('public/images/prod-thumb-2-inverters.jpg', quality=95)

# Card 3 (Batteries): X: 358 to 502
p3 = src.crop((359, 298, 503, 365))
p3.resize((p3.width * 2, p3.height * 2), Image.Resampling.LANCZOS).save('public/images/prod-thumb-3-batteries.jpg', quality=95)

# Card 4 (Mounting Structures): X: 518 to 662
p4 = src.crop((519, 298, 663, 365))
p4.resize((p4.width * 2, p4.height * 2), Image.Resampling.LANCZOS).save('public/images/prod-thumb-4-structures.jpg', quality=95)

# Card 5 (Accessories): X: 679 to 823
p5 = src.crop((680, 298, 824, 365))
p5.resize((p5.width * 2, p5.height * 2), Image.Resampling.LANCZOS).save('public/images/prod-thumb-5-accessories.jpg', quality=95)

# Card 6 (Monitoring Systems): X: 839 to 983
p6 = src.crop((840, 298, 984, 365))
p6.resize((p6.width * 2, p6.height * 2), Image.Resampling.LANCZOS).save('public/images/prod-thumb-6-monitoring.jpg', quality=95)

# 3. Brand logos strip from bottom left:
# X: 210 to 660, Y: 890 to 950 -> in 576: Y ~ 510 to 550
brand_strip = src.crop((210, 508, 660, 552))
brand_strip.resize((brand_strip.width * 2, brand_strip.height * 2), Image.Resampling.LANCZOS).save('public/images/brand-partners-strip.png')

print("All product visual assets extracted successfully!")
