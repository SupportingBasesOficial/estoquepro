$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Project Runtime Base | Doctor ==="
Write-Host ""

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ProjectRoot = (Resolve-Path $ProjectRoot).Path

$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    throw "git não encontrado na máquina atual."
}

$RepoRoot = git -C $ProjectRoot rev-parse --show-toplevel 2>$null
if (-not $RepoRoot) {
    throw "O projeto não está dentro de um repositório Git."
}
$RepoRoot = $RepoRoot.Trim()

$RepoName = Split-Path $RepoRoot -Leaf

$ProjectRootUri = [System.Uri](($ProjectRoot.TrimEnd('\') + '\'))
$RepoRootUri = [System.Uri](($RepoRoot.TrimEnd('\') + '\'))
$RelativeSurfacePath = $RepoRootUri.MakeRelativeUri($ProjectRootUri).ToString()
$RelativeSurfacePath = [System.Uri]::UnescapeDataString($RelativeSurfacePath).Replace('/', '\').TrimEnd('\')

if ([string]::IsNullOrWhiteSpace($RelativeSurfacePath)) {
    $SurfaceId = "root"
} else {
    $SurfaceId = ($RelativeSurfacePath -replace '[\\/:*?"<>| ]', '--')
}

$RuntimeIdentity = "$RepoName--$SurfaceId"

$PackageJson = Join-Path $ProjectRoot "package.json"
$ProjectNodeModules = Join-Path $ProjectRoot "node_modules"
$LocalCacheRoot = Join-Path "C:\SBOfficial_DepCache" $RuntimeIdentity
$LocalNodeModules = Join-Path $LocalCacheRoot "node_modules"

$projectDrive = ([System.IO.Path]::GetPathRoot($ProjectRoot)).TrimEnd('\')
$cacheDrive = ([System.IO.Path]::GetPathRoot($LocalCacheRoot)).TrimEnd('\')

$projectVolume = Get-Volume -DriveLetter $projectDrive.TrimEnd(':') -ErrorAction SilentlyContinue
$cacheVolume = Get-Volume -DriveLetter $cacheDrive.TrimEnd(':') -ErrorAction SilentlyContinue

$projectFs = $projectVolume.FileSystem
$cacheFs = $cacheVolume.FileSystem

Write-Host "RepoRoot:            $RepoRoot"
Write-Host "RepoName:            $RepoName"
Write-Host "ProjectRoot:         $ProjectRoot"
Write-Host "RelativeSurfacePath: $RelativeSurfacePath"
Write-Host "RuntimeIdentity:     $RuntimeIdentity"
Write-Host ""
Write-Host "PackageJson:         $(Test-Path -LiteralPath $PackageJson)"
Write-Host "ProjectNodeModules:  $(Test-Path -LiteralPath $ProjectNodeModules)"
Write-Host "LocalCacheRoot:      $LocalCacheRoot"
Write-Host "LocalNodeModules:    $(Test-Path -LiteralPath $LocalNodeModules)"
Write-Host "Project filesystem:  $projectFs"
Write-Host "Cache filesystem:    $cacheFs"
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

Write-Host "tsc.cmd existe:      $(Test-Path -LiteralPath $TscCmd)"
Write-Host "vitest.cmd existe:   $(Test-Path -LiteralPath $VitestCmd)"
Write-Host ""

Write-Host "Diagnóstico concluído."
Write-Host ""