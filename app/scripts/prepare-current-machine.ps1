$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Project Runtime Base | Prepare Current Machine ==="
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

$LocalCacheBase = "C:\SBOfficial_DepCache"
$LocalCacheRoot = Join-Path $LocalCacheBase $RuntimeIdentity
$LocalNodeModules = Join-Path $LocalCacheRoot "node_modules"
$ProjectNodeModules = Join-Path $ProjectRoot "node_modules"

Write-Host "RepoRoot:            $RepoRoot"
Write-Host "RepoName:            $RepoName"
Write-Host "ProjectRoot:         $ProjectRoot"
Write-Host "RelativeSurfacePath: $RelativeSurfacePath"
Write-Host "RuntimeIdentity:     $RuntimeIdentity"
Write-Host "LocalCacheRoot:      $LocalCacheRoot"
Write-Host "ProjectNodeModules:  $ProjectNodeModules"
Write-Host "LocalNodeModules:    $LocalNodeModules"
Write-Host ""

New-Item -ItemType Directory -Force -Path $LocalCacheBase | Out-Null
New-Item -ItemType Directory -Force -Path $LocalCacheRoot | Out-Null

$PackageJson = Join-Path $ProjectRoot "package.json"
if (-not (Test-Path -LiteralPath $PackageJson)) {
    throw "package.json não encontrado em $ProjectRoot"
}

$npmCmd = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmCmd) {
    throw "npm não encontrado na máquina atual."
}

$projectDrive = ([System.IO.Path]::GetPathRoot($ProjectRoot)).TrimEnd('\')
$cacheDrive = ([System.IO.Path]::GetPathRoot($LocalCacheRoot)).TrimEnd('\')

$projectVolume = Get-Volume -DriveLetter $projectDrive.TrimEnd(':') -ErrorAction SilentlyContinue
$cacheVolume = Get-Volume -DriveLetter $cacheDrive.TrimEnd(':') -ErrorAction SilentlyContinue

$projectFs = $projectVolume.FileSystem
$cacheFs = $cacheVolume.FileSystem

Write-Host "Project filesystem:  $projectFs"
Write-Host "Cache filesystem:    $cacheFs"
Write-Host ""

$canUseJunction = ($projectFs -eq "NTFS" -and $cacheFs -eq "NTFS")

if ($canUseJunction) {
    if (Test-Path -LiteralPath $ProjectNodeModules) {
        $item = Get-Item -LiteralPath $ProjectNodeModules -Force
        $isReparse = ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0

        if (-not $isReparse) {
            Write-Host "Removendo node_modules local do projeto para substituir por junction..."
            Remove-Item -LiteralPath $ProjectNodeModules -Recurse -Force
        } else {
            Write-Host "node_modules do projeto já é junction/symlink. Mantendo."
        }
    }

    if (-not (Test-Path -LiteralPath $ProjectNodeModules)) {
        Write-Host "Criando junction do projeto para o cache local..."
        cmd /c mklink /J "$ProjectNodeModules" "$LocalNodeModules" | Out-Null
    }
} else {
    Write-Host "Junction não será usada porque um dos volumes não é NTFS."
    Write-Host "Este runtime deve ser executado preferencialmente no clone local em NTFS."
    Write-Host ""
}

Set-Location $ProjectRoot

Write-Host "Rodando npm install com flags enxutas..."
Write-Host ""

npm install --no-audit --no-fund --ignore-scripts

$TscCmd = Join-Path $ProjectNodeModules ".bin\tsc.cmd"
$VitestCmd = Join-Path $ProjectNodeModules ".bin\vitest.cmd"

if (-not (Test-Path -LiteralPath $TscCmd)) {
    throw "tsc.cmd não encontrado após instalação."
}

if (-not (Test-Path -LiteralPath $VitestCmd)) {
    throw "vitest.cmd não encontrado após instalação."
}

Write-Host ""
Write-Host "Preparação concluída com sucesso."
if ($canUseJunction) {
    Write-Host "node_modules está fora do workspace e ligado por junction."
} else {
    Write-Host "node_modules permanece local porque a topologia atual não suporta junction."
}
Write-Host ""