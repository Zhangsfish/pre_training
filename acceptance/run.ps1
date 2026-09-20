param([Parameter(Mandatory=$true)][string]$OutputDirectory)
$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $taskRoot
$resultDir = [IO.Path]::GetFullPath($OutputDirectory)
New-Item -ItemType Directory -Force -Path $resultDir | Out-Null
$env:CI = 'true'
$env:ASTRO_TELEMETRY_DISABLED = '1'
$env:PYTHONIOENCODING = 'utf-8'
$env:PLAYWRIGHT_MODULE = Join-Path $taskRoot 'acceptance/node_modules/playwright'
if (-not $env:RESUME_PYTHON) { $env:RESUME_PYTHON = Join-Path $taskRoot 'acceptance/.venv/Scripts/python.exe' }
if (-not $env:CHROME_EXECUTABLE) { throw 'Set CHROME_EXECUTABLE to your installed Chrome executable.' }
$runs = [Collections.Generic.List[object]]::new()
function Run-Check([string]$Name, [string]$Executable, [string[]]$Arguments) {
    $started = [DateTime]::UtcNow.ToString('o')
    $log = Join-Path $resultDir ($Name + '.log')
    $lines = & $Executable @Arguments 2>&1
    $exitCode = $LASTEXITCODE
    [IO.File]::WriteAllText($log, ($lines -join "`n") + "`n", [Text.UTF8Encoding]::new($false))
    $runs.Add(@{ command = $Executable + ' ' + ($Arguments -join ' '); log_path = $Name + '.log'; started_at = $started; exit_code = $exitCode })
    [IO.File]::WriteAllText((Join-Path $resultDir 'commands.json'), (ConvertTo-Json -Depth 8 -InputObject @($runs.ToArray())) + "`n", [Text.UTF8Encoding]::new($false))
    Write-Output "$Name exit=$exitCode"
    if ($exitCode -ne 0) { throw "$Name failed; inspect $log" }
}
Run-Check 'check' 'npm.cmd' @('--prefix','site','run','check')
Run-Check 'resume-build' 'npm.cmd' @('--prefix','site','run','resume:build','--','--verify-published')
Run-Check 'resume-check' 'npm.cmd' @('--prefix','site','run','resume:check')
Run-Check 'pdf-inventory' $env:RESUME_PYTHON @('acceptance/pdf-inventory.py',$resultDir)
Run-Check 'build' 'npm.cmd' @('--prefix','site','run','build')
Run-Check 'test' 'npm.cmd' @('--prefix','site','run','test')
Run-Check 'test-jd' 'npm.cmd' @('--prefix','site','run','test:jd')
Run-Check 'audit-dist' 'npm.cmd' @('--prefix','site','run','audit:dist')
Run-Check 'inventory' 'node' @('acceptance/inventory.mjs',$resultDir)
Run-Check 'test-e2e' 'npm.cmd' @('--prefix','site','run','test:e2e','--','--output',$resultDir)
Run-Check 'acceptance-browser' 'node' @('acceptance/browser.mjs',$resultDir)
Run-Check 'external-links' 'node' @('acceptance/external.mjs',$resultDir)
