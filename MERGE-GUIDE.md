# How to Merge a Fork Branch into Your Branch

## Example: Merge `junkiet/jkey` into `james223-jjl/mycd` V3

### Step 1: Add the fork as a remote

```bash
git remote add junkiet https://github.com/junkiet/mycd.git
```

> Only need to do this once. Skip if already added.

### Step 2: Fetch the branch from the fork

```bash
git fetch junkiet jkey
```

### Step 3: Switch to your target branch

```bash
git checkout V3
```

### Step 4: Merge the fork branch into your branch

```bash
git merge junkiet/jkey -m "Merge junkiet/jkey into V3"
```

### Step 5: Resolve conflicts (if any)

If there are merge conflicts:

1. Open the conflicted files
2. Choose which changes to keep
3. Stage the resolved files:
   ```bash
   git add .
   ```
4. Commit:
   ```bash
   git commit -m "Resolve merge conflicts"
   ```

### Step 6: Push to GitHub

```bash
git push origin V3
```

---

## One-liner (if no conflicts)

```bash
git remote add junkiet https://github.com/junkiet/mycd.git && git fetch junkiet jkey && git checkout V3 && git merge junkiet/jkey -m "Merge junkiet/jkey into V3" && git push origin V3
```

---

## General Format

Replace the values for any fork/branch:

```bash
git remote add <remote-name> https://github.com/<fork-owner>/<repo>.git
git fetch <remote-name> <branch-name>
git checkout <your-target-branch>
git merge <remote-name>/<branch-name> -m "Merge message"
git push origin <your-target-branch>
```
