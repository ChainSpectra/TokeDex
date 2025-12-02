# GitHub OAuth - Multiple Localhost Ports Setup

## Problem
Your dev server keeps using different ports (5173, 5174, 5175, etc.) because previous ports are in use.

## Solution: Add ALL Common Ports to GitHub OAuth

### Step 1: Go to GitHub OAuth App Settings
1. Visit: https://github.com/settings/developers
2. Click on your "TokeDex" OAuth app
3. Scroll to **"Authorization callback URL"**

### Step 2: Add Multiple Callback URLs

GitHub OAuth allows **multiple callback URLs**. Add all these:

```
http://localhost:5173/auth/github/callback
http://localhost:5174/auth/github/callback
http://localhost:5175/auth/github/callback
http://localhost:5176/auth/github/callback
http://localhost:5177/auth/github/callback
http://localhost:5178/auth/github/callback
http://localhost:5179/auth/github/callback
http://localhost:5180/auth/github/callback
```

**How to add multiple URLs:**
- You can list them all in the text field, one per line
- OR add them one at a time using "Add another callback URL" button (if available)

### Step 3: Click "Update application"

Now GitHub OAuth will work on **ANY** of these ports! 🎉

---

## Alternative: Force Kill Existing Ports

If you want to always use port 5173, kill any processes using it:

### On Windows (PowerShell):
```powershell
# Find what's using port 5173
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Get-Process -Id $_ }

# Kill the process
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

Or use this simple command:
```powershell
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### On Mac/Linux:
```bash
# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

---

## Recommended Approach

**Use both solutions:**

1. ✅ **Add multiple callback URLs** to GitHub OAuth (covers all cases)
2. ✅ **Keep `strictPort: false`** in vite.config.ts (automatic fallback)

This way:
- If port 5173 is free → Uses 5173
- If port 5173 is busy → Uses 5174, 5175, etc.
- GitHub OAuth works on all of them!

---

## Quick Command to Free Port 5173

Create a script to quickly free the port:

**Windows PowerShell script (`kill-port-5173.ps1`):**
```powershell
$port = 5173
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | 
            Select-Object -ExpandProperty OwningProcess -Unique

if ($process) {
    Stop-Process -Id $process -Force
    Write-Host "✓ Killed process on port $port"
} else {
    Write-Host "✓ Port $port is already free"
}
```

Run with: `powershell .\kill-port-5173.ps1`

---

## Check Current Port

Want to know which port is being used? Look at the terminal output:

```
VITE v7.2.4  ready in 432 ms

➜  Local:   http://localhost:5177/    ← THIS IS YOUR CURRENT PORT
```

Or check the browser URL bar.

---

## Summary

**Best solution:** Add ports 5173-5180 to your GitHub OAuth app. Then it works no matter which port Vite chooses!

No more "redirect URI mismatch" errors! 🎉
