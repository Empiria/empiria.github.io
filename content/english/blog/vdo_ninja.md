---
title: Why I Use VDO Ninja for Video Calling and Screen Sharing
date: 2024-09-30
draft: false
author: Thomas
categories:
  - Tools
---
When working remotely, it's important to have a reliable video calling and screen-sharing tool that suits a technical environment. For internal calls with other developers, pair programming sessions, and the occasional client meeting, VDO.Ninja has become my go-to tool.

## Peer-to-Peer Connections: A Critical Advantage
One of the main reasons I prefer VDO.Ninja over other platforms is its P2P architecture. Many video conferencing tools route calls through centralized servers, introducing potential lag, data privacy concerns, and connection issues. VDO.Ninja, on the other hand, creates direct connections between participants, drastically improving performance, especially for low-latency communication.

This is especially appreciated when I’m pair programming or doing a code review. Delays in voice and video can lead to frustrating communication breakdowns, but VDO.Ninja’s P2P approach keeps everything as close to real-time as possible. Plus, it gives me peace of mind knowing that our conversations aren't routed through third-party servers, keeping data between participants only.

Even when we use rooms, which allow multiple participants to join a call, VDO.Ninja still maintains P2P connections. This means that the quality doesn’t degrade even with several developers or clients on the line.

## High-Quality Screen Sharing: Perfect for Technical Work
In addition to video calls, VDO.Ninja excels at screen sharing, and this is one of the features I rely on the most. Whether I’m walking through code with a colleague or troubleshooting a bug, the ability to share a high-quality screen is invaluable. Some tools struggle with clarity, especially when you’re using ultrawide monitors or working with text-heavy environments, but VDO.Ninja handles these scenarios beautifully.

I often have multiple code windows, terminals, and design previews open on my ultrawide display. With VDO.Ninja, the person on the other side can see everything clearly, down to the finest details. The screen-sharing resolution is sharp enough that code is readable without needing to zoom in or adjust the screen.

## Customizing VDO.Ninja for My Needs: URL Parameters
One of the hidden gems of VDO.Ninja is how customizable it is through URL parameters. Here’s a breakdown of the ones I frequently use and why they matter for technical collaboration:

room=YourRoomName: This creates a dedicated room that I can easily share with teammates or clients. It’s convenient for recurring meetings or ad-hoc sessions.

ssq=-1 & sharperscreen: This setting ensures that the screen is shared at the highest possible quality, which is critical when we’re discussing detailed code or designs.

rbr=50000 & trb=50000 & crb: These parameters control the receive and transmit bitrates, ensuring that both ends of the call maintain the highest video quality possible. By setting these to 50,000 kbps, I can minimize compression artifacts and ensure that what I see on my screen is exactly what others see.

codec=av1,vp9,vp8,h264: This defines the order of preferred video codecs. I prioritise the higher quality (and CPU intensive) codecs first so that they are used if the browser and hardware supports them.

q=0: This sets the video quality to maximum. 

These combine to form the default URL that I use for video calls https://vdo.ninja/?room=YourRoomName&ssq=-1&sharperscreen&rbr=50000&trb=50000&crb&codec=av1,vp9,vp8,h264&q=0

## Simple, Reliable, and Lightweight
VDO.Ninja doesn’t come with the bloat you might find in other video conferencing tools. It focuses on what matters most: high-quality, low-latency video calls and screen sharing. The browser-based design means it works across different operating systems without requiring any installation. This flexibility is great for quickly setting up meetings with other developers or clients who may be using different platforms.

## Conclusion
VDO.Ninja’s P2P architecture, browser-based design and highly customizable settings make it the perfect tool for maintaining high-quality, real-time communication. It's phenomenally flexible and is now the only video conferencing software I use. 