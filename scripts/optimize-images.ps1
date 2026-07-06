Add-Type -AssemblyName System.Drawing

# 1. Resize and Compress Logo (PNG)
$logoPath = "s:\webestone\src\assets\Webestone-Logo.png"
$logoOptimizedPath = "s:\webestone\src\assets\Webestone-Logo-optimized.png"

if (Test-Path $logoPath) {
    Write-Host "Optimizing Logo..."
    $img = [System.Drawing.Image]::FromFile($logoPath)
    # Target retina-capable width of 450px (rendered at 225px width on page)
    $newImg = New-Object System.Drawing.Bitmap(450, 94)
    $g = [System.Drawing.Graphics]::FromImage($newImg)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, 450, 94)
    $img.Dispose()
    $g.Dispose()
    $newImg.Save($logoOptimizedPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newImg.Dispose()
    Move-Item -Path $logoOptimizedPath -Destination $logoPath -Force
    Write-Host "Logo optimized successfully!"
}

# 2. Resize and Compress Hero Thumbnail (JPG)
$heroPath = "s:\webestone\public\hero-thumbnail.jpg"
$heroOptimizedPath = "s:\webestone\public\hero-thumbnail-optimized.jpg"

if (Test-Path $heroPath) {
    Write-Host "Optimizing Hero Thumbnail..."
    $img = [System.Drawing.Image]::FromFile($heroPath)
    # Target width 800px (ideal balance of detail and performance for mobile + desktop screens)
    $newImg = New-Object System.Drawing.Bitmap(800, 450)
    $g = [System.Drawing.Graphics]::FromImage($newImg)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, 800, 450)
    $img.Dispose()
    $g.Dispose()

    # Apply 75% quality compression
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75)

    $newImg.Save($heroOptimizedPath, $encoder, $encoderParams)
    $newImg.Dispose()
    Move-Item -Path $heroOptimizedPath -Destination $heroPath -Force
    Write-Host "Hero Thumbnail optimized successfully!"
}
