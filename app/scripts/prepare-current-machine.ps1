$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Project Runtime Base | Prepare Current Machine ==="
Write-Host ""

# O script vive em <project-root>\scripts
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ProjectRoot = (Resolve-Path $ProjectRoot).Path
$ProjectName = Split-Path $ProjectRoot -Leaf

$LocalCacheBase = "C:\SBOfficial_DepCache"
$LocalCacheRoot = Join-Path $LocalCacheBase $ProjectName
$LocalNodeModules = Join-Path $LocalCacheRoot "node_modules"
$ProjectNodeModules = Join-Path $ProjectRoot "node_modules"

Write-Host "ProjectRoot:       $ProjectRoot"
Write-Host "ProjectName:       $ProjectName"
Write-Host "LocalCacheRoot:    $LocalCacheRoot"
Write-Host "ProjectNodeModule: $ProjectNodeModules"
Write-Host "LocalNodeModule:   $LocalNodeModules"
Write-Host ""

# Garantir pasta base do cache local
New-Item -ItemType Directory -Force -Path $LocalCacheBase | Out-Null
New-Item -ItemType Directory -Force -Path $LocalCacheRoot | Out-Null

# Validar package.json
$PackageJson = Join-Path $ProjectRoot "package.json"
if (-not (Test-Path -LiteralPath $PackageJson)) {
    throw "package.json não encontrado em $ProjectRoot"
}

# Garantir npm disponível
$npmCmd = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmCmd) {
    throw "npm não encontrado na máquina atual."
}

# Se node_modules existir no projeto como pasta real, remover
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

# Criar junction se não existir
if (-not (Test-Path -LiteralPath $ProjectNodeModules)) {
    Write-Host "Criando junction do projeto para o cache local..."
    cmd /c mklink /J "$ProjectNodeModules" "$LocalNodeModules" | Out-Null
}

# Instalar dependências no projeto (que agora aponta para o cache local)
Set-Location $ProjectRoot

Write-Host ""
Write-Host "Rodando npm install com flags enxutas..."
Write-Host ""

npm install --no-audit --no-fund --ignore-scripts

# Validar binários esperados
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
Write-Host "node_modules está fora do workspace portátil e ligado por junction."
Write-Host ""