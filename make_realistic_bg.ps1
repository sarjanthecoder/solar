Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\sarja\.gemini\antigravity-ide\brain\434f24a6-19f0-4832-a1b5-7f08e5a8c85a\.user_uploaded\media_1793103498490.png"
$src = [System.Drawing.Bitmap]::FromFile($sourcePath)

$w = $src.Width
$h = $src.Height

# We crop the top navbar: Y starts from 34
$topCrop = 34
$bannerH = $h - $topCrop

# Target resolution: 2048 x 500 for crisp 4K display
$targetW = 2048
$targetH = 500

$baseBmp = New-Object System.Drawing.Bitmap($w, $bannerH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Helper function for smoothstep
function SmoothStep($edge0, $edge1, $x) {
    $t = [Math]::Max(0.0, [Math]::Min(1.0, ($x - $edge0) / ($edge1 - $edge0)))
    return $t * $t * (3.0 - 2.0 * $t)
}

# 1. Fill base bitmap with the cropped image
for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $bannerH; $y++) {
        $srcY = $y + $topCrop
        $c = $src.GetPixel($x, $srcY)
        $baseBmp.SetPixel($x, $y, $c)
    }
}

# 2. Inpaint the sky above the roof where "Powering Real Homes" text is (X: 510..635, Y in base: 0..55)
for ($x = 510; $x -le 635; $x++) {
    for ($y = 0; $y -le 52; $y++) {
        $cur = $baseBmp.GetPixel($x, $y)
        # Check if text or arrow pixel
        $isGreenText = ($cur.G -gt $cur.R + 15) -and ($cur.G -gt $cur.B - 10) -and ($cur.G -lt 210)
        $isDarkArrow = ($cur.R -lt 140) -and ($cur.G -lt 140) -and ($cur.B -lt 160)
        $isNavGhost = ($y -lt 6)
        if ($isGreenText -or $isDarkArrow -or $isNavGhost) {
            # Blend cleanly from sky at x=490
            $refC = $baseBmp.GetPixel(490, [Math]::Min($y, 45))
            $baseBmp.SetPixel($x, $y, $refC)
        }
    }
}

# 3. Clean the left text area (X: 75 to 455, Y: 0 to bannerH)
# We want a seamless, natural transition:
# Left side of transition (X=75): blends with the natural foliage/sky
# Right side of transition (X=455): blends with the natural hills and sky near the house
for ($x = 75; $x -le 455; $x++) {
    $tX = ($x - 75) / (455.0 - 75.0)
    # Use smoothstep for soft blending
    $sX = $tX * $tX * (3.0 - 2.0 * $tX)
    
    for ($y = 0; $y -lt $bannerH; $y++) {
        $tY = $y / ($bannerH * 1.0)
        
        if ($y -ge 205) {
            # Near bottom: distant hills and soft ground
            $hillT = ($y - 205) / ($bannerH - 205.0)
            $rightC = $baseBmp.GetPixel(455, $y)
            $leftC = $baseBmp.GetPixel(75, $y)
            
            $r = [int]($leftC.R * (1.0 - $sX) + $rightC.R * $sX)
            $g1 = [int]($leftC.G * (1.0 - $sX) + $rightC.G * $sX)
            $b = [int]($leftC.B * (1.0 - $sX) + $rightC.B * $sX)
            $baseBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g1, $b))
        } else {
            # Sky area:
            # Sample right sky at X=455 at this Y
            $rightSky = $baseBmp.GetPixel(455, $y)
            
            # Left sky at X=75 (or clean sky just past leaves)
            $leftSkyR = 215 + [int](25 * $sX)
            $leftSkyG = 236 + [int](15 * $sX)
            $leftSkyB = 255
            
            $r = [int]($leftSkyR * (1.0 - $sX) + $rightSky.R * $sX)
            $g1 = [int]($leftSkyG * (1.0 - $sX) + $rightSky.G * $sX)
            $b = [int]($leftSkyB * (1.0 - $sX) + $rightSky.B * $sX)
            
            # Subtle soft warm glow in center
            $glowDist = [Math]::Abs($x - 300) / 160.0
            if ($glowDist -lt 1.0 -and $y -lt 160) {
                $glow = (1.0 - $glowDist) * 8.0 * (1.0 - $y / 160.0)
                $r = [Math]::Min(255, [int]($r + $glow))
                $g1 = [Math]::Min(255, [int]($g1 + $glow * 0.8))
            }
            
            # Feathered edges at X=75..90 to avoid any seam with the leaves
            if ($x -lt 95) {
                $edgeT = ($x - 75) / 20.0
                $origC = $baseBmp.GetPixel($x, $y)
                $r = [int]($origC.R * (1.0 - $edgeT) + $r * $edgeT)
                $g1 = [int]($origC.G * (1.0 - $edgeT) + $g1 * $edgeT)
                $b = [int]($origC.B * (1.0 - $edgeT) + $b * $edgeT)
            }
            # Feathered edge at X=440..455 with the house landscape
            if ($x -gt 435) {
                $edgeT = ($x - 435) / 20.0
                $origC = $baseBmp.GetPixel($x, $y)
                $r = [int]($r * (1.0 - $edgeT) + $origC.R * $edgeT)
                $g1 = [int]($g1 * (1.0 - $edgeT) + $origC.G * $edgeT)
                $b = [int]($b * (1.0 - $edgeT) + $origC.B * $edgeT)
            }
            
            $baseBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g1, $b))
        }
    }
}

# 4. Upscale to 2048 x 500 using High Quality Bicubic Interpolation
$upscaled = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gUpscale = [System.Drawing.Graphics]::FromImage($upscaled)
$gUpscale.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gUpscale.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gUpscale.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gUpscale.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$gUpscale.DrawImage($baseBmp, (New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)), 0, 0, $w, $bannerH, [System.Drawing.GraphicsUnit]::Pixel)

$outPath = "c:\Users\sarja\Downloads\solarmain\solarmain\public\images\projects-hero-banner-realistic.jpg"
# Save as high quality JPEG (95 quality)
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

$upscaled.Save($outPath, $encoder, $encoderParams)
Write-Host "Created high-res realistic background at: $outPath"

$upscaled.Dispose()
$gUpscale.Dispose()
$baseBmp.Dispose()
$src.Dispose()
