---
title: "Kubernetes Mastering Guide - Part 2"
description: "Continue from part 1 - to practical guide to mastering your jurney of understanding kubernetes"
date: "July 25, 2026"
readTime: "30 min read"
tags: ["engineer"]
---

**Have You Try this Game [Link](https://github.com/Manoj-engineer/k8squest/tree/main)?**
### Level 1 — The Crashing Pod (`CrashLoopBackOff`)
**The Scenario:** You deployed a pod, and it just... keeps restarting, forever.
 
**What Actually Broke:** The pod's `command` field was set to `nginxzz` — a typo. The nginx container image genuinely does not contain a program called that. Kubernetes pulled the image fine, started the container, and the container immediately exited because the command didn't exist.
 
**The Mental Model:** Think of the container image as a fully-stocked kitchen. The `command` field is you telling the cook exactly which dish to make. If you ask for a dish that isn't on the menu, the cook can't just improvise — they fail, every single time, identically. `CrashLoopBackOff` means: *the container started and then died* — so the problem lives **inside** the container, not in scheduling or networking. Also critical: **Pods are immutable.** You can't edit a running pod's command — you delete it and recreate it. This is exactly why Deployments exist (next level).
 
**Commands:**
```bash
kubectl describe pod <name> -n <namespace>     # Events tell you the exact exec error
kubectl logs <name> -n <namespace> --previous  # see the crash output
kubectl delete pod <name> -n <namespace> && kubectl apply -f fixed.yaml
```
 
**Real-World Lesson:** A developer added `command: ["/app/startup.sh"]` but forgot `chmod +x` on the script. Every pod crash-looped in production for 12 minutes — roughly $50K in lost revenue for that window. Always test container commands locally (`docker run --rm -it <image> <command>`) before deploying.
 
---