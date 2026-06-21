$content = Get-Content "scripts\components.js" -Raw -Encoding UTF8
$marker = "};`r`n`r`n    <div className"
$idx = $content.IndexOf($marker)
if ($idx -gt 0) {
    $trimmed = $content.Substring(0, $idx + 3)
    [System.IO.File]::WriteAllText("scripts\components.js", $trimmed, [System.Text.Encoding]::UTF8)
    Write-Host "Trimmed successfully at index $idx"
} else {
    Write-Host "Marker not found, checking with LF..."
    $marker2 = "};`n`n    <div className"
    $idx2 = $content.IndexOf($marker2)
    if ($idx2 -gt 0) {
        $trimmed = $content.Substring(0, $idx2 + 3)
        [System.IO.File]::WriteAllText("scripts\components.js", $trimmed, [System.Text.Encoding]::UTF8)
        Write-Host "Trimmed (LF) at index $idx2"
    } else {
        Write-Host "Could not find marker"
        $content.Substring(755*30, 200)
    }
}
