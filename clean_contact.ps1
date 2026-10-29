Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\sarja\Downloads\solarmain\solarmain\public\images\contact-artwork-3d.jpg"
$dstPath = "c:\Users\sarja\Downloads\solarmain\solarmain\public\images\contact-artwork-3d.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height

$dst = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstData = $dst.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$stride = [Math]::Abs($srcData.Stride)
$bytes = $stride * $h
$rgbValues = New-Object byte[] $bytes
[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $rgbValues, 0, $bytes)

# Visited array: 0 = unvisited, 1 = background, 2 = foreground
$visited = New-Object byte[] ($w * $h)
$qX = New-Object System.Collections.Generic.Queue[int]
$qY = New-Object System.Collections.Generic.Queue[int]

# Helper to check if pixel is checkerboard gray
function Is-Checkerboard([int]$r, [int]$g, [int]$b) {
    $diffRG = [Math]::Abs($r - $g)
    $diffGB = [Math]::Abs($g - $b)
    $diffRB = [Math]::Abs($r - $b)
    $maxDiff = [Math]::Max($diffRG, [Math]::Max($diffGB, $diffRB))
    
    # Checkerboard is neutral gray between 110 and 245 with low chroma
    return ($maxDiff -le 16 -and $r -ge 110 -and $r -le 245)
}

# Seed with all 4 borders
for ($x = 0; $x -lt $w; $x++) {
    # Top border
    $idxTop = $x * 4
    if (Is-Checkerboard $rgbValues[$idxTop + 2] $rgbValues[$idxTop + 1] $rgbValues[$idxTop]) {
        $visited[$x] = 1
        $qX.Enqueue($x)
        $qY.Enqueue(0)
    }
    # Bottom border
    $yB = $h - 1
    $idxB = ($yB * $stride) + ($x * 4)
    if (Is-Checkerboard $rgbValues[$idxB + 2] $rgbValues[$idxB + 1] $rgbValues[$idxB]) {
        $visited[$yB * $w + $x] = 1
        $qX.Enqueue($x)
        $qY.Enqueue($yB)
    }
}

for ($y = 0; $y -lt $h; $y++) {
    # Left border
    $idxL = $y * $stride
    if ($visited[$y * $w] -eq 0 -and (Is-Checkerboard $rgbValues[$idxL + 2] $rgbValues[$idxL + 1] $rgbValues[$idxL])) {
        $visited[$y * $w] = 1
        $qX.Enqueue(0)
        $qY.Enqueue($y)
    }
    # Right border
    $xR = $w - 1
    $idxR = ($y * $stride) + ($xR * 4)
    if ($visited[$y * $w + $xR] -eq 0 -and (Is-Checkerboard $rgbValues[$idxR + 2] $rgbValues[$idxR + 1] $rgbValues[$idxR])) {
        $visited[$y * $w + $xR] = 1
        $qX.Enqueue($xR)
        $qY.Enqueue($y)
    }
}

Write-Host "Initial border seeds: $($qX.Count)"

# Flood fill
while ($qX.Count -gt 0) {
    $cx = $qX.Dequeue()
    $cy = $qY.Dequeue()

    $bIdx = ($cy * $stride) + ($cx * 4)
    # Set fully transparent
    $rgbValues[$bIdx + 3] = 0

    # 4 neighbors
    # Left
    if ($cx -gt 0) {
        $nx = $cx - 1
        $nIdx = $cy * $w + $nx
        if ($visited[$nIdx] -eq 0) {
            $nbByte = ($cy * $stride) + ($nx * 4)
            if (Is-Checkerboard $rgbValues[$nbByte + 2] $rgbValues[$nbByte + 1] $rgbValues[$nbByte]) {
                $visited[$nIdx] = 1
                $qX.Enqueue($nx)
                $qY.Enqueue($cy)
            } else {
                $visited[$nIdx] = 2
            }
        }
    }
    # Right
    if ($cx -lt ($w - 1)) {
        $nx = $cx + 1
        $nIdx = $cy * $w + $nx
        if ($visited[$nIdx] -eq 0) {
            $nbByte = ($cy * $stride) + ($nx * 4)
            if (Is-Checkerboard $rgbValues[$nbByte + 2] $rgbValues[$nbByte + 1] $rgbValues[$nbByte]) {
                $visited[$nIdx] = 1
                $qX.Enqueue($nx)
                $qY.Enqueue($cy)
            } else {
                $visited[$nIdx] = 2
            }
        }
    }
    # Up
    if ($cy -gt 0) {
        $ny = $cy - 1
        $nIdx = $ny * $w + $cx
        if ($visited[$nIdx] -eq 0) {
            $nbByte = ($ny * $stride) + ($cx * 4)
            if (Is-Checkerboard $rgbValues[$nbByte + 2] $rgbValues[$nbByte + 1] $rgbValues[$nbByte]) {
                $visited[$nIdx] = 1
                $qX.Enqueue($cx)
                $qY.Enqueue($ny)
            } else {
                $visited[$nIdx] = 2
            }
        }
    }
    # Down
    if ($cy -lt ($h - 1)) {
        $ny = $cy + 1
        $nIdx = $ny * $w + $cx
        if ($visited[$nIdx] -eq 0) {
            $nbByte = ($ny * $stride) + ($cx * 4)
            if (Is-Checkerboard $rgbValues[$nbByte + 2] $rgbValues[$nbByte + 1] $rgbValues[$nbByte]) {
                $visited[$nIdx] = 1
                $qX.Enqueue($cx)
                $qY.Enqueue($ny)
            } else {
                $visited[$nIdx] = 2
            }
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($rgbValues, 0, $dstData.Scan0, $bytes)
$src.UnlockBits($srcData)
$dst.UnlockBits($dstData)
$src.Dispose()

$dst.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Dispose()

Write-Host "Successfully saved transparent contact artwork to $dstPath"
