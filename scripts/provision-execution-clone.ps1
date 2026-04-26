param(
    [string]$ExecutionBasePath = "C:\SBOfficial_Work"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Execution Topology | Provision Execution Clone ==="
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

$OriginUrl = git -C $RepoRoot remote get-url origin 2>$null
if (-not $OriginUrl) {
    throw "origin não configurado neste repositório."
}
$OriginUrl = $OriginUrl.Trim()

$RepoName = Split-Path $RepoRoot -Leaf
$ExecutionClonePath = Join-Path $ExecutionBasePath $RepoName

Write-Host "PortableRepoRoot:   $RepoRoot"
Write-Host "Origin:             $OriginUrl"
Write-Host "ExecutionBasePath:  $ExecutionBasePath"
Write-Host "ExecutionClonePath: $ExecutionClonePath"
Write-Host ""

New-Item -ItemType Directory -Force -Path $ExecutionBasePath | Out-Null

if (Test-Path -LiteralPath $ExecutionClonePath) {
    throw "O clone de execução já existe em: $ExecutionClonePath"
}

git clone $OriginUrl $ExecutionClonePath

Write-Host ""
Write-Host "Clone de execução provisionado com sucesso."
Write-Host "Próximo passo: abrir o clone em $ExecutionClonePath"
Write-Host ""