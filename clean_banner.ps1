Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\sarja\.gemini\antigravity-ide\brain\434f24a6-19f0-4832-a1b5-7f08e5a8c85a\.user_uploaded\media_1793103498490.png"
$src = [System.Drawing.Bitmap]::FromFile($sourcePath)

$w = $src.Width
$h = $src.Height

# Start below navbar: Y=39 to bottom
$topOffset = 39
$cropH = $h - $topOffset

$cleanBmp = New-Object System.Drawing.Bitmap($w, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# 1. Copy the right half containing the house (X=440 to $w-1)
for ($x = 440; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $cropH; $y++) {
        $srcY = $y + $topOffset
        $c = $src.GetPixel($x, $srcY)
        $cleanBmp.SetPixel($x, $y, $c)
    }
}

# 2. Inpaint sky above roof: X=505 to 640, Y=0 to 52 (which corresponds to srcY=39 to 91)
# Clean sky exists at X=470..495.
for ($x = 505; $x -le 640; $x++) {
    for ($y = 0; $y -le 52; $y++) {
        $cur = $cleanBmp.GetPixel($x, $y)
        # Check if text, arrow, or green
        $isGreen = ($cur.G -gt $cur.R + 12) -and ($cur.G -gt $cur.B - 15) -and ($cur.G -lt 220)
        $isDark = ($cur.R -lt 140) -and ($cur.G -lt 140) -and ($cur.B -lt 165)
        $isGhostNav = ($y -lt 4)
        if ($isGreen -or $isDark -or $isGhostNav) {
            # Copy from clean sky at x=485 with slight variation
            $refX = 485
            $refC = $cleanBmp.GetPixel($refX, [Math]::Min($y, 48))
            $cleanBmp.SetPixel($x, $y, $refC)
        }
    }
}

# 3. Inpaint top right card: X=870 to 995, Y=0 to 110
for ($x = 870; $x -le 995; $x++) {
    for ($y = 0; $y -le 110; $y++) {
        $cur = $cleanBmp.GetPixel($x, $y)
        # Inside card or card border or card text/button
        $isCard = ($cur.R -gt 220 -and $cur.G -gt 235 -and $cur.B -gt 220) -or 
                  ($cur.R -lt 60 -and $cur.G -lt 60) -or 
                  ($cur.G -gt 110 -and $cur.R -lt 50) -or 
                  ($cur.R -gt 240 -and $cur.G -gt 240)
        if ($isCard -or $y -lt 4) {
            # Sample sky from X=855
            $refC = $cleanBmp.GetPixel(855, [Math]::Min($y, 90))
            $cleanBmp.SetPixel($x, $y, $refC)
        }
    }
}

# 4. Far-left green leaves: X=0 to 65
for ($x = 0; $x -le 65; $x++) {
    for ($y = 0; $y -lt $cropH; $y++) {
        $srcY = $y + $topOffset
        $cleanBmp.SetPixel($x, $y, $src.GetPixel($x, $srcY))
    }
}

# 5. Middle sky & landscape (X=66 to 439)
# Seamless gradient from X=66 (left foliage edge) to X=440 (house background)
for ($x = 66; $x -lt 440; $x++) {
    $tX = ($x - 66) / (439.0 - 66.0)
    # Smooth cosine easing
    $eX = (1.0 - [Math]::Cos($tX * [Math]::PI)) / 2.0
    
    for ($y = 0; $y -lt $cropH; $y++) {
        $tY = $y / ($cropH * 1.0)
        
        # Ground/hills at bottom (Y > cropH - 45)
        if ($y -ge ($cropH - 45)) {
            $groundT = ($y - ($cropH - 45)) / 45.0
            # Blend smoothly into bottom grass/hills of house
            $rightC = $cleanBmp.GetPixel(440, $y)
            $leftC = $cleanBmp.GetPixel(65, $y)
            $r = [int]($leftC.R * (1.0 - $eX) + $rightC.R * $eX)
            $g1 = [int]($leftC.G * (1.0 - $eX) + $rightC.G * $eX)
            $b = [int]($leftC.B * (1.0 - $eX) + $rightC.B * $eX)
            $cleanBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g1, $b))
        } else {
            # Sky:
            # Right sky color at X=440
            $rightSky = $cleanBmp.GetPixel(440, $y)
            
            # Left sky base (natural sunny blue matching atmosphere)
            $leftSkyR = [int](210 + 35 * $eX)
            $leftSkyG = [int](235 + 18 * $eX)
            $leftSkyB = 255
            
            $r = [int]($leftSkyR * (1.0 - $eX) + $rightSky.R * $eX)
            $g1 = [int]($leftSkyG * (1.0 - $eX) + $rightSky.G * $eX)
            $b = [int]($leftSkyB * (1.0 - $eX) + $rightSky.B * $eX)
            
            # Soft radial warmth around X=300, Y=60
            $distX = ($x - 320) / 140.0
            $distY = ($y - 60) / 100.0
            $d = [Math]::Sqrt($distX * $distX + $distY * $distY)
            if ($d -lt 1.5) {
                $glow = (1.5 - $d) / 1.5 * 10.0
                $r = [Math]::Min(255, [int]($r + $glow * 0.9))
                $g1 = [Math]::Min(255, [int]($g1 + $glow * 0.7))
                $b = [Math]::Min(255, [int]($b + $glow * 0.3))
            }
            
            # Blend edges with left foliage at X=66..85
            if ($x -le 85) {
                $edgeT = ($x - 66) / 19.0
                $origC = $cleanBmp.GetPixel(65, $y)
                $r = [int]($origC.R * (1.0 - $edgeT) + $r * $edgeT)
                $g1 = [int]($origC.G * (1.0 - $edgeT) + $g1 * $edgeT)
                $b = [int]($origC.B * (1.0 - $edgeT) + $b * $edgeT)
            }
            
            $cleanBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g1, $b))
        }
    }
}

# 6. Upscale to 2048 x 520 (High Definition Bicubic)
$targetW = 2048
$targetH = 520
$upscaled = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($upscaled)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$g.DrawImage($cleanBmp, (New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)), 0, 0, $w, $cropH, [System.Drawing.GraphicsUnit]::Pixel)

$destPath = "c:\Users\sarja\Downloads\solarmain\solarmain\public\images\projects-hero-banner-clean.jpg"
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]96)

$upscaled.Save($destPath, $encoder, $encoderParams)
Write-Host "Clean background saved successfully to: $destPath"

$upscaled.Dispose()
$g.Dispose()
$cleanBmp.Dispose()
$src.Dispose()
