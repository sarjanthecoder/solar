from PIL import Image

src = Image.open('C:/Users/sarja/.gemini/antigravity-ide/brain/434f24a6-19f0-4832-a1b5-7f08e5a8c85a/.user_uploaded/media_1793106195946.jpg')
w, h = src.size
print(f"Source size: {w}x{h}")

# 1. Hero House on the right
# X: ~510 to 860, Y: ~35 to 290
# Let's crop the house with SUV car and roof
hero_house = src.crop((510, 36, 860, 290))
hero_house_2x = hero_house.resize((hero_house.width * 2, hero_house.height * 2), Image.Resampling.LANCZOS)
hero_house_2x.save('public/images/why-choose-hero-house.jpg', quality=95)
print("Saved why-choose-hero-house.jpg")

# 2. 8 Feature Card Thumbnails:
# Row 1 (Y ~ 296 to 376):
# Card 1 (Team): X: 37 to 132
thumb1 = src.crop((37, 298, 132, 374))
thumb1.resize((thumb1.width * 2, thumb1.height * 2), Image.Resampling.LANCZOS).save('public/images/why-thumb-1-team.jpg', quality=95)

# Card 2 (Panels): X: 271 to 353
thumb2 = src.crop((271, 298, 353, 374))
thumb2.resize((thumb2.width * 2, thumb2.height * 2), Image.Resampling.LANCZOS).save('public/images/why-thumb-2-panels.jpg', quality=95)

# Card 3 (Design): X: 501 to 597
thumb3 = src.crop((501, 298, 597, 374))
thumb3.resize((thumb3.width * 2, thumb3.height * 2), Image.Resampling.LANCZOS).save('public/images/why-thumb-3-design.jpg', quality=95)

# Card 4 (Warranty): X: 746 to 831
thumb4 = src.crop((746, 298, 831, 374))
thumb4.resize((thumb4.width * 2, thumb4.height * 2), Image.Resampling.LANCZOS).save('public/images/why-thumb-4-warranty.jpg', quality=95)

# Row 2 (Y ~ 380 to 458):
# Card 5 (Quote): X: 37 to 132
thumb5 = src.crop((37, 380, 132, 458))
thumb5.resize((thumb5.width * 2, thumb5.height * 2), Image.Resampling.LANCZOS).save('public/images/why-thumb-5-quote.jpg', quality=95)

# Card 6 (Install): X: 271 to 353
thumb6 = src.crop((271, 380, 353, 458))
thumb6.resize((thumb6.width * 2, thumb6.height * 2), Image.Resampling.LANCZOS).save('public/images/why-thumb-6-install.jpg', quality=95)

# Card 7 (Support): X: 501 to 597
thumb7 = src.crop((501, 380, 597, 458))
thumb7.resize((thumb7.width * 2, thumb7.height * 2), Image.Resampling.LANCZOS).save('public/images/why-thumb-7-support.jpg', quality=95)

# Card 8 (Future): X: 746 to 831
thumb8 = src.crop((746, 380, 831, 458))
thumb8.resize((thumb8.width * 2, thumb8.height * 2), Image.Resampling.LANCZOS).save('public/images/why-thumb-8-future.jpg', quality=95)

print("All 8 thumbnails saved successfully!")
