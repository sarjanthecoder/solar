Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\sarja\.gemini\antigravity-ide\brain\434f24a6-19f0-4832-a1b5-7f08e5a8c85a\.user_uploaded\media_1793103498490.png"
$img = [System.Drawing.Bitmap]::FromFile($filePath)

# Let's inspect the bounding boxes:
# 1. Navbar area: Y = 0 to ~38
# 2. Left text area: X = 65 to 450, Y = 40 to 260
# 3. "Powering Real Homes" text area: X = 500 to 620, Y = 35 to 85
# 4. "From Homes to Industries" card: X = 870 to 990, Y = 40 to 140

Write-Host "Image Size: $($img.Width) x $($img.Height)"

# Inspect sky above roof around X=550, Y=20..80
for ($y = 20; $y -le 80; $y += 10) {
    $c = $img.GetPixel(560, $y)
    Write-Host "Sky at (560, $y): R=$($c.R), G=$($c.G), B=$($c.B)"
}

# Inspect sky around X=930, Y=20..40 (above the card)
for ($y = 10; $y -le 40; $y += 10) {
    $c = $img.GetPixel(930, $y)
    Write-Host "Sky at (930, $y): R=$($c.R), G=$($c.G), B=$($c.B)"
}

$img.Dispose()
