$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Project Runtime Base | Validate Current Machine ==="
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

if (-not (Test-Path -LiteralPath $PackageJson)) {
    throw "package.json não encontrado em $ProjectRoot"
}

if (-not (Test-Path -LiteralPath $ProjectNodeModules)) {
    throw "node_modules não encontrado. Rode prepare-current-machine.ps1 primeiro."
}

$npmCmd = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmCmd) {
    throw "npm não encontrado na máquina atual."
}

Write-Host "RepoRoot:            $RepoRoot"
Write-Host "RepoName:            $RepoName"
Write-Host "ProjectRoot:         $ProjectRoot"
Write-Host "RelativeSurfacePath: $RelativeSurfacePath"
Write-Host "RuntimeIdentity:     $RuntimeIdentity"
Write-Host ""

Set-Location $ProjectRoot

Write-Host "Rodando typecheck..."
npm run typecheck

Write-Host ""
Write-Host "Rodando testes..."
npm run test

Write-Host ""
Write-Host "Validação concluída com sucesso."
Write-Host ""