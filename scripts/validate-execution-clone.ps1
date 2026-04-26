param(
    [string]$ExecutionBasePath = "C:\SBOfficial_Work"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Execution Topology | Validate Execution Clone ==="
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

$PortableOrigin = git -C $PortableRepoRoot remote get-url origin 2>$null
if (-not $PortableOrigin) {
    throw "origin não configurado no workspace portátil."
}
$PortableOrigin = $PortableOrigin.Trim()

$RepoName = Split-Path $PortableRepoRoot -Leaf
$ExecutionClonePath = Join-Path $ExecutionBasePath $RepoName

if (-not (Test-Path -LiteralPath $ExecutionClonePath)) {
    throw "Clone de execução não encontrado em: $ExecutionClonePath"
}

$ExecutionRepoRoot = git -C $ExecutionClonePath rev-parse --show-toplevel 2>$null
if (-not $ExecutionRepoRoot) {
    throw "O clone de execução encontrado não é um repositório Git válido."
}
$ExecutionRepoRoot = $ExecutionRepoRoot.Trim()

$ExecutionOrigin = git -C $ExecutionRepoRoot remote get-url origin 2>$null
if (-not $ExecutionOrigin) {
    throw "origin não configurado no clone de execução."
}
$ExecutionOrigin = $ExecutionOrigin.Trim()

$PortableBranch = (git -C $PortableRepoRoot branch --show-current).Trim()
$ExecutionBranch = (git -C $ExecutionRepoRoot branch --show-current).Trim()

$PortableDirty = -not [string]::IsNullOrWhiteSpace((git -C $PortableRepoRoot status --porcelain))
$ExecutionDirty = -not [string]::IsNullOrWhiteSpace((git -C $ExecutionRepoRoot status --porcelain))

Write-Host "PortableRepoRoot:   $PortableRepoRoot"
Write-Host "PortableOrigin:     $PortableOrigin"
Write-Host "PortableBranch:     $PortableBranch"
Write-Host "PortableDirty:      $PortableDirty"
Write-Host ""
Write-Host "ExecutionRepoRoot:  $ExecutionRepoRoot"
Write-Host "ExecutionOrigin:    $ExecutionOrigin"
Write-Host "ExecutionBranch:    $ExecutionBranch"
Write-Host "ExecutionDirty:     $ExecutionDirty"
Write-Host ""

if ($PortableOrigin -ne $ExecutionOrigin) {
    throw "Origem do clone de execução difere da origem do workspace portátil."
}

Write-Host "Validação da topologia concluída com sucesso."
Write-Host ""