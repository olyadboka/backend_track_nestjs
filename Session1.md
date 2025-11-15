# WEEK 1 
### SESSION 1
Topics to cover
    - Overview of 8 week
    - What we build
    - Software setup (Node (20 LTS), VS code, Postman, Git & GithubAccount)
    - installations commands
      node -v, npm -v, git --version
      
Development Environment Setup Guide  
(Node.js 20 + npm + VS Code + Postman + Git)

A. WINDOWS SETUP
----------------
1. Install Node.js (v20) and npm
- Visit: https://nodejs.org
- Download the LTS version (20.x) for Windows (.msi)
- Run installer → Next → Accept → Add to PATH → Finish
- Verify installation:
  node -v
  npm -v

2. Install VS Code
- Visit: https://code.visualstudio.com/
- Download for Windows and install
- Install these extensions in VS Code:
  - turbo 
  - Prettier
  
3. Install Postman
- Visit: https://www.postman.com/downloads/
- Download and install for Windows (64-bit)
- Use for API testing

4. Install Git
- Visit: https://git-scm.com/download/win
- Run installer → Keep defaults → Finish
- Verify installation:
  git --version
- Configure identity:
  git config --global user.name "Your Name"
  git config --global user.email "youremail@example.com"



### - Git and GuthUB basics
- what is version control - a tool that helps developers track changes in code
- git vs github (local vs remote repos)
| Concept               | Meaning                                           | Example                           |
| --------------------- | ------------------------------------------------- | --------------------------------- |
| **Repository (repo)** | A folder that Git tracks                          | `git init` creates one            |
| **Commit**            | A snapshot of your project                        | `git commit -m "Add login route"` |
| **Branch**            | A separate line of development                    | `git checkout -b new-feature`     |
| **Merge**             | Combines code from another branch                 | `git merge new-feature`           |
| **Remote**            | The online version of your repo (e.g., on GitHub) | `git push origin main`            |
| **Clone**             | Copy of a remote repo to your local machine       | `git clone <repo-url>`            |

- git workflow
    git init - initialize repo
    git add .  - adds changes files to staging
    git commit -m "Message"  - commit changes
    git remote add origin https://github.com/username/project.git
    git push -u origin main

- Branching and Collaboration - When working in a team, you don’t edit the main branch directly.
    git checkout -b my-branch  - creating new branch
    git checkout main 
    git merge my-branch   - merging
    
- GitHub Overview - GitHub is an online platform where Git repositories are stored and shared.
    It lets you:
        Host your projects publicly or privately.
        Collaborate via pull requests.
        Review code and manage issues.
        Automatically deploy your projects
        
| Command           | Description                       |
| ----------------- | --------------------------------- |
| `git status`      | Check what’s changed              |
| `git log`         | Show history of commits           |
| `git diff`        | See differences before committing |
| `git pull`        | Get latest changes from remote    |
| `git push`        | Send your changes to GitHub       |
| `git branch`      | Show all branches                 |
| `git merge`       | Combine branches                  |
| `git clone <url>` | Copy a repo from GitHub           |


