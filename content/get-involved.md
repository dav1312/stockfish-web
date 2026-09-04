---
title: "Get Involved"
description: "Whether you are a programming wizard or just a fan, there’s something you can do to help make Stockfish even better."
date: 2021-02-21T22:11:19-08:00
layout: "get-involved"

intro: "Whether you are a programming wizard or just a fan, there's something you can do to help make Stockfish even better."

cards:
  - id: "fishtest"
    title: "Fishtest"
    badge: "Distributed Testing"
    icon: "fas fa-network-wired"
    description: "Help Stockfish improve by installing the Fishtest worker; your computer will run self-play games to test future versions of the engine!"
    primary_button:
      text: "Install Worker GUI (beta)"
      url: "https://github.com/dav1312/fishtest-worker-gui/releases/latest/download/fishtest-worker-gui.exe"
      icon: "fab fa-windows"
    notice: "The worker GUI is unsigned; if you see \"Windows protected your PC\", click <strong>More info → Run anyway</strong>."
    links:
      - title: "Linux & Cloud Docker Image"
        url: "https://github.com/official-stockfish/docker-fishtest"
        icon: "fab fa-docker"
      - title: "Worker Documentation"
        url: "https://github.com/official-stockfish/fishtest/wiki/Running-the-worker"
        icon: "fas fa-book"
      - title: "Fishtest Dashboard"
        url: "https://tests.stockfishchess.org/tests"
        icon: "fas fa-chart-line"

  - id: "write-code"
    title: "Write Code"
    badge: "C++ & NNUE"
    icon: "fas fa-code"
    description: "Do you have a great idea that could improve Stockfish's playing strength? Fork the project on GitHub and commit away. Then use Fishtest to test your change."
    primary_button:
      text: "Stockfish on GitHub"
      url: "https://github.com/official-stockfish/Stockfish"
      icon: "fab fa-github"
      secondary: true
    links:
      - title: "Participating in the project"
        url: "https://github.com/official-stockfish/Stockfish/wiki/Developers#participating-in-the-project"
        icon: "fas fa-code-branch"
      - title: "Developer Guidelines & Wiki"
        url: "https://github.com/official-stockfish/Stockfish/wiki/Developers"
        icon: "fas fa-book-open"
      - title: "Validate on Fishtest"
        url: "https://tests.stockfishchess.org/tests"
        icon: "fas fa-vial"

  - id: "discuss"
    title: "Discuss"
    badge: "Community"
    icon: "fab fa-discord"
    description: "Join our Discord community and connect directly with the developers, engine authors, and chess researchers!"
    primary_button:
      text: "Join our Discord"
      url: "https://discord.gg/GWDRS3kU6R"
      icon: "fab fa-discord"
      button_color: "#5865F2"
    links:
      - title: "Official Stockfish Discord"
        url: "https://discord.gg/GWDRS3kU6R"
        icon: "fab fa-discord"
      - title: "GitHub Discussions"
        url: "https://github.com/official-stockfish/Stockfish/discussions"
        icon: "fas fa-comments"
---