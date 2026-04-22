This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting started

Install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Production build:

```bash
npm run build
npm run start
```

---

## CI/CD with GitHub Actions

This repository includes [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml), which runs **lint and build on every pull request and push**, and **deploys over SSH** when changes are pushed to `main` (or when you trigger the workflow manually).

### What the workflow does

1. **CI (all PRs and pushes)**  
   - Checks out the code  
   - Installs dependencies with `npm ci`  
   - Runs `npm run lint`  
   - Runs `npm run build`  

2. **CD (only `main`, not pull requests)**  
   - SSH into your server  
   - `cd` into the deployment directory  
   - `git fetch` / `git reset --hard` to match `origin/main`  
   - `npm ci` and `npm run build`  
   - If [PM2](https://pm2.keymetrics.io/) is installed, restarts the app process named `dt360`, or starts it with `npm run start`  

### Prerequisites

- A Linux server (VPS) with **Node.js 20+** and **npm**  
- **Git** installed on the server, and this repository cloned to a fixed path (for example `/var/www/dt360`)  
- **SSH** access from the internet (port **22** by default; for another port, edit the workflow and set the `port` input on the SSH action)  
- Optional but recommended: **PM2** for keeping the app running (`npm install -g pm2`)  

### Step 1 — Clone the repository on the server

On the server, create a directory and clone (use HTTPS or SSH URL depending on how you authenticate with GitHub):

```bash
sudo mkdir -p /var/www
sudo chown "$USER":"$USER" /var/www
cd /var/www
git clone https://github.com/DeskTeam-360/dt360.git
cd dt360
```

If the repository is private, use a [deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys/deploy-keys) or a personal access token with HTTPS, and ensure `git pull` / `git fetch` works without prompts.

### Step 2 — Install Node.js and PM2 (example on Ubuntu)

```bash
# Node.js 20.x (example using NodeSource; adjust for your OS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo npm install -g pm2
```

### Step 3 — First-time build on the server (optional but useful)

```bash
cd /var/www/dt360   # or your DEPLOY_PATH
npm ci
npm run build
pm2 start npm --name dt360 -- run start
pm2 save
pm2 startup   # follow the printed instructions so PM2 survives reboots
```

### Step 4 — Create an SSH key for GitHub Actions

On your **local machine** (not the server), generate a dedicated key pair used only for deployment:

```bash
ssh-keygen -t ed25519 -C "github-actions-dt360" -f ./gha_dt360_ed25519 -N ""
```

- Copy the **public** key (`gha_dt360_ed25519.pub`) to the server’s `~/.ssh/authorized_keys` for the deployment user (same user as `SSH_USER` below).  
- Keep the **private** key (`gha_dt360_ed25519`) secret; you will paste its full contents into a GitHub secret.

Test login:

```bash
ssh -i ./gha_dt360_ed25519 USER@YOUR_SERVER_IP
```

### Step 5 — Add GitHub repository secrets

In GitHub: **Settings → Secrets and variables → Actions → New repository secret**, add:

| Secret name           | Description |
|-----------------------|-------------|
| `SSH_HOST`            | Server hostname or IP (for example `203.0.113.10`) |
| `SSH_USER`            | Linux user that owns the clone and runs the app (for example `ubuntu` or `deploy`) |
| `SSH_PRIVATE_KEY`     | Full contents of the **private** key file (including `BEGIN` / `END` lines) |
| `DEPLOY_PATH`         | Absolute path to the git clone on the server (for example `/var/www/dt360`) |

**Security notes**

- Use a dedicated SSH key and a user with minimal permissions (only what is needed for this app directory).  
- Restrict `authorized_keys` with `command=` / `restrict` options if you want stricter SSH access.  
- Never commit private keys to the repository.

### Step 6 — Push to `main`

After secrets are set, any **push to `main`** that passes CI will run the deploy job. Open **Actions** in the GitHub UI to see logs.

### Manual deploy

**Actions → CI/CD → Run workflow** → choose branch `main` → **Run workflow**. This runs the same pipeline (CI then deploy) without waiting for a new commit.

### Custom SSH port

If SSH does not listen on port **22**, edit [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) and add the `port` input to the `appleboy/ssh-action` step, for example:

```yaml
with:
  host: ${{ secrets.SSH_HOST }}
  username: ${{ secrets.SSH_USER }}
  key: ${{ secrets.SSH_PRIVATE_KEY }}
  port: 2222
```

### Standalone build output

`next.config.ts` sets `output: "standalone"` so `next build` produces a minimal `.next/standalone` tree, which is useful for **Docker** or advanced deployments. The default workflow still uses `npm run start` (`next start`) on the server after a full clone; adjust the remote script if you switch to `node .next/standalone/server.js` and static file copies.

### Troubleshooting

| Issue | What to check |
|-------|----------------|
| Deploy fails on SSH | `SSH_HOST`, `SSH_USER`, key in `authorized_keys`, firewall allows GitHub runners to reach your SSH port |
| `git fetch` fails on server | Deploy key / credentials for private repo; `git remote -v` on server |
| `npm ci` / `npm run build` fails | Node version (20+), disk space, environment variables required at build time |
| App not updating | PM2 process name must be `dt360`, or change the workflow script to your process name |
| PRs fail CI | Fix lint or build errors locally with `npm run lint` and `npm run build` |

---

## Learn more

- [Next.js documentation](https://nextjs.org/docs)  
- [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)  
- [GitHub Actions documentation](https://docs.github.com/en/actions)  
