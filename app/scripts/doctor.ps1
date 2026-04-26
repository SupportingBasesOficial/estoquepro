$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Project Runtime Base | Doctor ==="
Write-Host ""

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ProjectRoot = (Resolve-Path $ProjectRoot).Path
$ProjectName = Split-Path $ProjectRoot -Leaf

$PackageJson = Join-Path $ProjectRoot "package.json"
$ProjectNodeModules = Join-Path $ProjectRoot "node_modules"
$LocalCacheRoot = Join-Path "C:\SBOfficial_DepCache" $ProjectName
$LocalNodeModules = Join-Path $LocalCacheRoot "node_modules"

Write-Host "ProjectRoot:      $ProjectRoot"
Write-Host "ProjectName:      $ProjectName"
Write-Host "PackageJson:      $(Test-Path -LiteralPath $PackageJson)"
Write-Host "ProjectNodeMods:  $(Test-Path -LiteralPath $ProjectNodeModules)"
Write-Host "LocalCacheRoot:   $LocalCacheRoot"
Write-Host "LocalNodeMods:    $(Test-Path -LiteralPath $LocalNodeModules)"
Write-Host ""

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
$npmCmd = Get-Command npm -ErrorAction SilentlyContinue

if ($nodeCmd) {
    Write-Host "node: OK -> $($nodeCmd.Source)"
} else {
    Write-Host "node: NÃO ENCONTRADO"
}

if ($npmCmd) {
    Write-Host "npm:  OK -> $($npmCmd.Source)"
} else {
    Write-Host "npm:  NÃO ENCONTRADO"
}

if (Test-Path -LiteralPath $ProjectNodeModules) {
    $item = Get-Item -LiteralPath $ProjectNodeModules -Force
    $isReparse = ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0
    Write-Host "node_modules é junction/symlink: $isReparse"
} else {
    Write-Host "node_modules do projeto não existe."
}

$TscCmd = Join-Path $ProjectNodeModules ".bin\tsc.cmd"
$VitestCmd = Join-Path $ProjectNodeModules ".bin\vitest.cmd"

Write-Host "tsc.cmd existe:    $(Test-Path -LiteralPath $TscCmd)"
Write-Host "vitest.cmd existe: $(Test-Path -LiteralPath $VitestCmd)"
Write-Host ""

Write-Host "Diagnóstico concluído."
Write-Host ""