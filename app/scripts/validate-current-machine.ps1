$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Project Runtime Base | Validate Current Machine ==="
Write-Host ""

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ProjectRoot = (Resolve-Path $ProjectRoot).Path
$ProjectNodeModules = Join-Path $ProjectRoot "node_modules"
$PackageJson = Join-Path $ProjectRoot "package.json"

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

Set-Location $ProjectRoot

Write-Host "Rodando typecheck..."
npm run typecheck

Write-Host ""
Write-Host "Rodando testes..."
npm run test

Write-Host ""
Write-Host "Validação concluída com sucesso."
Write-Host ""