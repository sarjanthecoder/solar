from PIL import Image

src = Image.open('C:/Users/sarja/.gemini/antigravity-ide/brain/434f24a6-19f0-4832-a1b5-7f08e5a8c85a/.user_uploaded/media_1793104952058.jpg')
w, h = src.size

# Let's check sections:
# 1. Top banner: Y: 35 to 290
banner = src.crop((0, 35, w, 290))
banner.save('public/images/debug_banner.jpg')

# 2. Thumbnail of house in Card 1 (Subsidy for Residential Solar):
# Let's inspect where Card 1 is: Y around 290 to 460, X around 30 to 300
card1 = src.crop((30, 290, 310, 460))
card1.save('public/images/debug_card1.jpg')

# 3. Bottom CTA engineer photo: Y around 460 to 576, X around 700 to 980
engineer = src.crop((750, 460, 980, 576))
engineer.save('public/images/debug_engineer.jpg')

print("Debug crops saved successfully.")
