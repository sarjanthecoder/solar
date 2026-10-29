Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\sarja\.gemini\antigravity-ide\brain\434f24a6-19f0-4832-a1b5-7f08e5a8c85a\.user_uploaded\media_1793101954122.jpg"
$img = [System.Drawing.Image]::FromFile($filePath)
Write-Host "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
