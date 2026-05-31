# Local Development

This repository is a static site. There is no build step required for the
current setup; the browser can load `index.html` and the assets under `css/`,
`js/`, `res/`, `dep/`, and related folders directly through a local static
server.

## Preferred Local Server

Use the Live Server launcher stored in `.draft/local-live-server.cjs`.

```powershell
& "D:\Program Files\nodejs\node.exe" ".\.draft\local-live-server.cjs"
```

Then open:

```text
http://127.0.0.1:5500/
```

The launcher serves the workspace root:

```text
D:\MachineLearning\XDzzzzzZyq.github.io
```

It binds to `127.0.0.1` on port `5500`, so the site is available only on the
local machine.

## Simple Fallback

If Live Server is unavailable, use Python's built-in static server from the
repository root:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Then open the same URL:

```text
http://127.0.0.1:5500/
```

## Verify The Server

Check that the page responds:

```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:5500/" -UseBasicParsing
```

Check that the port is listening:

```powershell
netstat -ano | Select-String ":5500"
```

## Stop The Server

Press `Ctrl+C` in the terminal running the server.

If the server was started in a detached or hidden process, find the process ID
from `netstat` and stop it:

```powershell
netstat -ano | Select-String ":5500"
Stop-Process -Id <PID>
```
