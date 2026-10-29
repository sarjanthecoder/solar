Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\sarja\.gemini\antigravity-ide\brain\434f24a6-19f0-4832-a1b5-7f08e5a8c85a\.user_uploaded\media_1793103498490.png"
$img = [System.Drawing.Bitmap]::FromFile($filePath)

Write-Host "Width: $($img.Width), Height: $($img.Height)"
# Sample colors at various points to inspect
Write-Host "Top-left (10, 10): $($img.GetPixel(10, 10))"
Write-Host "Banner start (10, 45): $($img.GetPixel(10, 45))"
Write-Host "Sky near house (480, 50): $($img.GetPixel(480, 50))"
Write-Host "Sky top-right (900, 45): $($img.GetPixel(900, 45))"

$img.Dispose()
