Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\sarja\.gemini\antigravity-ide\brain\434f24a6-19f0-4832-a1b5-7f08e5a8c85a\.user_uploaded\media_1793101954122.jpg"
$img = [System.Drawing.Bitmap]::FromFile($filePath)

Write-Host "Width: $($img.Width), Height: $($img.Height)"
# In media_1793101954122.jpg (1024x576):
# Check row by row at x=100 where the filter buttons (All Projects, green button) appear
for ($y = 250; $y -lt 350; $y += 5) {
    $c = $img.GetPixel(100, $y)
    Write-Host "Y=$y Color: R=$($c.R), G=$($c.G), B=$($c.B)"
}

$img.Dispose()
