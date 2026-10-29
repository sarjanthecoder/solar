Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\sarja\.gemini\antigravity-ide\brain\434f24a6-19f0-4832-a1b5-7f08e5a8c85a\.user_uploaded\media_1793103498490.png"
$src = [System.Drawing.Bitmap]::FromFile($sourcePath)

$w = $src.Width
$h = $src.Height

# Create a new bitmap
$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Draw the base image
$g.DrawImage($src, 0, 0, $w, $h)

Write-Host "Base image loaded: $w x $h"

# 1. First, let's inpaint the sky above the roof where "Powering Real Homes" text is (X: 510..635, Y: 18..90)
# The sky here is a smooth gradient from deep soft blue at Y=18 to bright whitish-blue at Y=80.
# We can sample clean sky columns from X=470..500 and interpolate.
for ($x = 510; $x -le 635; $x++) {
    $ratio = ($x - 510) / 125.0
    for ($y = 15; $y -le 88; $y++) {
        # Sample left clean sky at x=495, and right clean sky near tree at x=645
        # Also sample vertical gradient
        $cLeft = $src.GetPixel(495, [Math]::Min($y, $h - 1))
        # Check if the pixel at ($x, $y) is text (e.g. green or dark)
        $cur = $src.GetPixel($x, $y)
        # Greenish handwriting text: G > R + 20 or dark text
        $isGreenText = ($cur.G -gt $cur.R + 15) -and ($cur.G -gt $cur.B - 10) -and ($cur.G -lt 200)
        $isDarkArrow = ($cur.R -lt 120) -and ($cur.G -lt 120) -and ($cur.B -lt 140)
        if ($isGreenText -or $isDarkArrow -or ($y -lt 35)) {
            # Inpaint from clean sky
            $refX = 495
            $refC = $src.GetPixel($refX, $y)
            $bmp.SetPixel($x, $y, $refC)
        }
    }
}

# 2. Inpaint top navbar text across the whole width (Y: 0..38)
# For each column X, sample the sky/foliage color below the navbar (around Y=40..45) or use realistic sky
for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -le 36; $y++) {
        if ($x -lt 80) {
            # Far left is tree branches: keep natural or sample foliage from y=40
            $cur = $src.GetPixel($x, $y)
            # If navbar text or button, replace with foliage color
            # Leave existing leaves if green
            if ($cur.R -gt 200 -and $cur.G -gt 200 -and $cur.B -gt 200) {
                # white text/space -> fill with top leaf/sky
                $ref = $src.GetPixel($x, 38)
                $bmp.SetPixel($x, $y, $ref)
            }
        } elseif ($x -ge 80 -and $x -lt 470) {
            # Left banner area: sky gradient
            # Clean sky color at y=40..42
            $sampleY = 38
            $ref = $src.GetPixel([Math]::Min($x, 460), $sampleY)
            $bmp.SetPixel($x, $y, $ref)
        } elseif ($x -ge 470 -and $x -lt 640) {
            # Center sky
            $ref = $src.GetPixel(495, [Math]::Min(38 + $y, 70))
            $bmp.SetPixel($x, $y, $ref)
        } elseif ($x -ge 640 -and $x -lt 840) {
            # Above roof ridge
            # Check if there is navbar text
            $cur = $src.GetPixel($x, $y)
            $isText = ($cur.R -gt 220 -and $cur.G -gt 220 -and $cur.B -gt 220) -or ($cur.R -lt 50 -and $cur.G -lt 50)
            if ($isText) {
                $ref = $src.GetPixel($x, 40)
                $bmp.SetPixel($x, $y, $ref)
            }
        } elseif ($x -ge 840) {
            # Top right: has "Get a Free quote" button, phone number
            # Behind it is sky and foliage!
            $cur = $src.GetPixel($x, $y)
            # If button (green) or text, fill with sky/leaf from y=42
            $ref = $src.GetPixel($x, 42)
            $bmp.SetPixel($x, $y, $ref)
        }
    }
}

# 3. Left text area: X=65 to 455, Y=37 to 275
# This is where "Real Projects Real Impact", stats, and subtexts are.
# In the original scene, this entire area is a gentle, sunny sky with soft sunrays and distant green rolling hills at Y=230..275.
# Let's create a beautiful, smooth realistic sky blend here:
for ($x = 65; $x -le 455; $x++) {
    $tX = ($x - 65) / (455.0 - 65.0)
    for ($y = 37; $y -lt $h; $y++) {
        $tY = ($y - 37) / ($h - 37.0)
        
        # At Y > 245, there are soft green hills in the distance at X ~ 420..460
        if ($y -ge 245) {
            # Sample hill colors from X=440..460 at this Y
            $hillC = $src.GetPixel(445, $y)
            # Sample left ground/hill at x=60
            $leftC = $src.GetPixel(60, $y)
            $r = [int]($leftC.R * (1 - $tX) + $hillC.R * $tX)
            $g1 = [int]($leftC.G * (1 - $tX) + $hillC.G * $tX)
            $b = [int]($leftC.B * (1 - $tX) + $hillC.B * $tX)
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g1, $b))
        } else {
            # Clean sky:
            # Top color: soft sky blue (R=210, G=236, B=255)
            # Mid color (around sun rays): radiant whitish sky blue (R=242, G=250, B=255)
            # Bottom color above hills: pale mint-sky (R=235, G=248, B=245)
            $topR = 205 + [int](25 * $tX)
            $topG = 232 + [int](18 * $tX)
            $topB = 255
            
            $midR = 240 + [int](12 * $tX)
            $midG = 248 + [int](5 * $tX)
            $midB = 255
            
            $botR = 230 + [int](15 * $tX)
            $botG = 245 + [int](8 * $tX)
            $botB = 245 + [int](5 * $tX)
            
            if ($tY -lt 0.45) {
                $subT = $tY / 0.45
                $r = [int]($topR * (1 - $subT) + $midR * $subT)
                $g1 = [int]($topG * (1 - $subT) + $midG * $subT)
                $b = [int]($topB * (1 - $subT) + $midB * $subT)
            } else {
                $subT = ($tY - 0.45) / 0.55
                $r = [int]($midR * (1 - $subT) + $botR * $subT)
                $g1 = [int]($midG * (1 - $subT) + $botG * $subT)
                $b = [int]($midB * (1 - $subT) + $botB * $subT)
            }
            
            # Add subtle sunbeam warmth around X=250..420, Y=60..180
            $dx = ($x - 340) / 100.0
            $dy = ($y - 120) / 90.0
            $dist = [Math]::Sqrt($dx * $dx + $dy * $dy)
            if ($dist -lt 1.5) {
                $glow = (1.5 - $dist) / 1.5 * 12.0
                $r = [Math]::Min(255, [int]($r + $glow * 0.9))
                $g1 = [Math]::Min(255, [int]($g1 + $glow * 0.7))
                $b = [Math]::Min(255, [int]($b + $glow * 0.3))
            }
            
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g1, $b))
        }
    }
}

# 4. Remove "From Homes to Industries" card at top right (X=875..995, Y=45..150)
# Clean card region with sky and foliage
for ($x = 875; $x -le 995; $x++) {
    for ($y = 45; $y -le 145; $y++) {
        # The card is a white semi-transparent rounded rectangle
        $cur = $src.GetPixel($x, $y)
        # If inside the card (very bright white/tinted):
        $isCard = ($cur.R -gt 225 -and $cur.G -gt 235 -and $cur.B -gt 225) -or ($cur.R -lt 40 -and $cur.G -lt 40) -or ($cur.G -gt 110 -and $cur.R -lt 40)
        if ($isCard) {
            # Inpaint with blue sky color at that Y
            # At x=860 (to the left of the card), there is clean blue sky and roof
            $ref = $src.GetPixel(865, [Math]::Min($y, 110))
            # Or smooth sky gradient
            $skyB = [Math]::Max(240, 255 - [int]($y * 0.2))
            $skyG = [Math]::Max(205, 225 - [int]($y * 0.2))
            $skyR = [Math]::Max(120, 150 - [int]($y * 0.3))
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $skyR, $skyG, $skyB))
        }
    }
}

$destPath = "c:\Users\sarja\Downloads\solarmain\solarmain\public\images\projects-hero-banner-bg.png"
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved clean background image to $destPath"

$bmp.Dispose()
$g.Dispose()
$src.Dispose()
