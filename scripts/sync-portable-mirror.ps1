param(
    [switch]$AllowDirtyPortable
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Execution Topology | Sync Portable Mirror ==="
Write-Host ""

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ProjectRoot = (Resolve-Path $ProjectRoot).Path

$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    throw "git não encontrado na máquina atual."
}

$PortableRepoRoot = git -C $ProjectRoot rev-parse --show-toplevel 2>$null
if (-not $PortableRepoRoot) {
    throw "O workspace portátil não está dentro de um repositório Git."
}
$PortableRepoRoot = $PortableRepoRoot.Trim()

$OriginUrl = git -C $PortableRepoRoot remote get-url origin 2>$null
if (-not $OriginUrl) {
    throw "origin não configurado no workspace portátil."
}
$OriginUrl = $OriginUrl.Trim()

$CurrentBranch = git -C $PortableRepoRoot branch --show-current 2>$null
if (-not $CurrentBranch) {
    throw "Não foi possível determinar a branch atual."
}
$CurrentBranch = $CurrentBranch.Trim()

$PortableDirty = -not [string]::IsNullOrWhiteSpace((git -C $PortableRepoRoot status --porcelain))
if ($PortableDirty -and -not $AllowDirtyPortable) {
    throw "Workspace portátil possui mudanças locais. Faça commit/stash ou use -AllowDirtyPortable conscientemente."
}

Write-Host "PortableRepoRoot: $PortableRepoRoot"
Write-Host "Origin:           $OriginUrl"
Write-Host "Branch:           $CurrentBranch"
Write-Host "PortableDirty:    $PortableDirty"
Write-Host ""

git -C $PortableRepoRoot fetch origin
git -C $PortableRepoRoot pull --ff-only origin $CurrentBranch

Write-Host ""
Write-Host "Espelho portátil sincronizado com sucesso."
Write-Host ""