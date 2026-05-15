<#
PowerShell script to replace remote repository contents with this local project.
WARNING: This will force-push to the remote `main` branch and overwrite history.
Make sure you have push access to the remote repository.
#>

param(
    [string]$RemoteUrl = 'https://github.com/raiYan15/MERN-STUDENT.git',
    [switch]$Run
)

function Confirm-Action($message) {
    $resp = Read-Host "$message (y/N)"
    return $resp -match '^[yY]'
}

if (-not $Run) {
    Write-Host "This script will create a backup branch on the remote and then force-push the current folder to \`main\` on the remote: $RemoteUrl`n"
    if (-not (Confirm-Action "Proceed with the destructive replace operation")) { Write-Host "Aborted by user."; exit 1 }
}

$timestamp = (Get-Date -Format yyyyMMddHHmmss)
$backupBranch = "backup-before-replace-$timestamp"

# Ensure we are in the repository root
$cwd = Get-Location
Write-Host "Working in: $cwd"

# Ensure git exists
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Write-Error "git not found in PATH"; exit 1 }

# Set remote
git remote remove origin 2>$null
git remote add origin $RemoteUrl
Write-Host "Remote origin set to $RemoteUrl"

# Try to fetch remote main and create a backup branch if it exists
Write-Host "Fetching remote refs..."
git fetch origin --quiet
$hasRemoteMain = $false
try {
    git rev-parse --verify origin/main 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { $hasRemoteMain = $true }
} catch { }

if ($hasRemoteMain) {
    Write-Host "Creating remote backup branch: $backupBranch"
    git fetch origin main --quiet
    git push origin FETCH_HEAD:refs/heads/$backupBranch
    Write-Host "Created remote backup branch: $backupBranch"
} else {
    Write-Host "Remote main not found. Skipping remote backup.";
}

# Initialize local repo if needed
if (-not (Test-Path -Path '.git')) {
    Write-Host 'Initializing local git repository'
    git init
}

# Stage and commit
Write-Host 'Staging files...'
git add .
try {
    git commit -m "Deploy WORK-FLOW-main into MERN-STUDENT"
} catch {
    Write-Host 'No changes to commit or initial commit failed (maybe already committed). Continuing.'
}

# Force-push to remote main
Write-Host "Force-pushing current branch to origin/main (this will overwrite remote main)..."
git branch -M main

try {
    git push -u origin main --force
    Write-Host 'Force-push completed successfully.'
} catch {
    Write-Error 'git push failed. Check your credentials and remote access.'
    exit 1
}

Write-Host 'Done.'
