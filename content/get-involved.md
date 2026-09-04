---
title: "Get Involved"
description: "Whether you are a programming wizard or just a fan, there’s something you can do to help make Stockfish even better."
date: 2021-02-21T22:11:19-08:00
layout: "get-involved"

cards:
  - title: "Fishtest"
    icon: "fas fa-network-wired"
    description: "Help Stockfish improve by installing the Fishtest worker; your computer will run games to test future versions of the engine!"
    note: "The worker GUI is unsigned; if you see “Windows protected your PC”, click More info → Run anyway."
    buttons:
      - text: "Install the worker GUI (beta)"
        url: "https://github.com/dav1312/fishtest-worker-gui/releases/latest/download/fishtest-worker-gui.exe"
      - text: "Server and Worker Docker Image"
        url: "https://github.com/official-stockfish/docker-fishtest"
        secondary: true
      - text: "Worker Documentation"
        url: "https://github.com/official-stockfish/fishtest/wiki/Running-the-worker"
        secondary: true
      - text: "Dashboard"
        url: "https://tests.stockfishchess.org/tests"
        secondary: true

  - title: "Write Code"
    icon: "fas fa-code"
    description: "Do you have a great idea that could improve Stockfish's playing strength? Fork the project on GitHub and commit away. Then use Fishtest to test your change."
    buttons:
      - text: "Stockfish on GitHub"
        url: "https://github.com/official-stockfish/Stockfish"
        secondary: true
      - text: "Participating in the project"
        url: "https://github.com/official-stockfish/Stockfish/wiki/Developers#participating-in-the-project"
        secondary: true

  - title: "Discuss"
    icon: "fab fa-discord"
    description: "Join our Discord community and connect directly with the developers!"
    buttons:
      - text: "Discord"
        url: "https://discord.gg/GWDRS3kU6R"
        color: "#5865F2"
      - text: "GitHub Discussions"
        url: "https://github.com/official-stockfish/Stockfish/discussions"
        secondary: true
---