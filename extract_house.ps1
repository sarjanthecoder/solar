Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\sarja\.gemini\antigravity-ide\brain\434f24a6-19f0-4832-a1b5-7f08e5a8c85a\.user_uploaded\media_1793103498490.png"
$src = [System.Drawing.Bitmap]::FromFile($sourcePath)

$w = $src.Width
$h = $src.Height

# House bounding box in source:
# X from 460 to 1024, Y from 36 to 281
$startX = 460
$startY = 36
$houseW = $w - $startX
$houseH = $h - $startY

$houseBmp = New-Object System.Drawing.Bitmap($houseW, $houseH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $houseW; $x++) {
    for ($y = 0; $y -lt $houseH; $y++) {
        $c = $src.GetPixel($startX + $x, $startY + $y)
        $houseBmp.SetPixel($x, $y, $c)
    }
}

# 1. Clean the "50+ Projects Completed" badge at the bottom-left (relative X: 0..65, Y: 180..houseH-1)
# That area in the real scene is lush green lawn, low bushes, and warm garden lighting.
# Sample garden plants and grass from relative X: 75..120 at the same Y
for ($x = 0; $x -le 65; $x++) {
    for ($y = 175; $y -lt $houseH; $y++) {
        # Check if white badge background or blue pin or text
        $cur = $houseBmp.GetPixel($x, $y)
        $isBadge = ($cur.R -gt 215 -and $cur.G -gt 225 -and $cur.B -gt 230) -or 
                   ($cur.B -gt 180 -and $cur.R -lt 50) -or 
                   ($cur.R -lt 40 -and $cur.G -lt 40)
        if ($isBadge -or ($x -lt 40 -and $y -gt 190)) {
            # Sample grass and bush texture from x=80
            $refX = [Math]::Min($houseW - 1, 75 + ($x % 30))
            $refC = $houseBmp.GetPixel($refX, $y)
            $houseBmp.SetPixel($x, $y, $refC)
        }
    }
}

# 2. Clean the green text "Powering Real Homes" above roof (relative X: 45..175, Y: 0..52)
for ($x = 45; $x -le 175; $x++) {
    for ($y = 0; $y -le 52; $y++) {
        $cur = $houseBmp.GetPixel($x, $y)
        $isGreen = ($cur.G -gt $cur.R + 15) -and ($cur.G -gt $cur.B - 10) -and ($cur.G -lt 220)
        $isDark = ($cur.R -lt 140) -and ($cur.G -lt 140) -and ($cur.B -lt 165)
        $isTopGhost = ($y -lt 4)
        if ($isGreen -or $isDark -or $isTopGhost) {
            # Sample pure sky from x=20 (clean sky above trees)
            $refC = $houseBmp.GetPixel(22, [Math]::Min($y, 45))
            $houseBmp.SetPixel($x, $y, $refC)
        }
    }
}

# 3. Clean the card at top-right (relative X: 410..535, Y: 0..110)
for ($x = 410; $x -le 535; $x++) {
    for ($y = 0; $y -le 110; $y++) {
        $cur = $houseBmp.GetPixel($x, $y)
        $isCard = ($cur.R -gt 220 -and $cur.G -gt 235 -and $cur.B -gt 220) -or 
                  ($cur.R -lt 60 -and $cur.G -lt 60) -or 
                  ($cur.G -gt 110 -and $cur.R -lt 50) -or 
                  ($cur.R -gt 240 -and $cur.G -gt 240)
        if ($isCard -or $y -lt 4) {
            # Sample sky from X=395
            $refC = $houseBmp.GetPixel(395, [Math]::Min($y, 90))
            $houseBmp.SetPixel($x, $y, $refC)
        }
    }
}

# 4. Upscale cleanly to 1600 x 700 with Bicubic Interpolation
$upW = 1600
$upH = 700
$upBmp = New-Object System.Drawing.Bitmap($upW, $upH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($upBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$g.DrawImage($houseBmp, (New-Object System.Drawing.Rectangle(0, 0, $upW, $upH)), 0, 0, $houseW, $houseH, [System.Drawing.GraphicsUnit]::Pixel)

$destPath = "c:\Users\sarja\Downloads\solarmain\solarmain\public\images\projects-solar-villa-realistic.jpg"
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]96)

$upBmp.Save($destPath, $encoder, $encoderParams)
Write-Host "Realistic solar villa image saved to: $destPath"

$upBmp.Dispose()
$g.Dispose()
$houseBmp.Dispose()
$src.Dispose()
