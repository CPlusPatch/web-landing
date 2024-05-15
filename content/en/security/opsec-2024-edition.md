---
title: Operations Security: 2024 edition
created_at: 1715798358000
image: /images/articles/opsec-2024/servers-unsplash.jpg
description: Second Edition of my Operations Security guide, updated for 2024. Now with 30% more cyber per cyber.
author: Jesse W
private: true
author_image: /images/avatars/jessew.png
author_handle: @CPlusPatch
---

This article is a refresh of my [Opsec & You](/blog/en/security/opsec-and-you) article, updated for 2024. It is a general and specific guide to security or anonymity on computers in general.

#### Who is this useful for?

- Those wanting to secure their personal devices
- Those wanting to evade surveillance
- Those wanting to secure their devices from malware
- Anyone curious enough to read this

## Table of Contents

Feel free to skip around to the sections that interest you the most.

[[toc]]

# The Internet

As is often said in the field of operational security, the most secure computer is one that is fully powered off, disconnected from the internet, put in a safe, and buried in a hole in the ground. However, this is not practical for most people. So, we must make do with what we have.

What do we have? Fortunately, a lot of important global infrastructure was designed by very intelligent people who were very paranoid about security. Unfortunately, those people aren't the ones creating the infrastructure, that role instead falling onto negligent companies and governments who are more interested in profit and control than security.

Case in point: [IPv6](#ipv6).

## Web Browsers

The primary way most people know of accessing the internet is through programs called web browsers. Fundamentally, web browsers are just programs that turn code into pretty pictures and text and gradients. As browser functionality has expanded, multiple security and privacy issues have arisen.

### Choice

There are many web browsers to choose from. You may be familiar with the big three: Google Chrome, Mozilla Firefox, and Safari.

One thing you might not know is that these three browsers are the **only** "real" browsers. All other browsers are modified versions of these three. Microsoft Edge, for example, is a modified version of Chrome, and so it just about every other browser (Arc, Brave, Vivaldi, Opera, etc.).

The reason why companies don't make their own browsers any more like they used to do, is because it is a rather literally impossible task to make a browser from scratch. As a point of reference, [Chromium's codebase](https://chromium.googlesource.com/chromium/src) (the open-source variant of Chrome) is over **fourty million** lines of code.

Chromium's codebase is so titanic that it is physically impossible for a single person, or even a team of people, to understand the entire codebase. It's not like all of this code is unnecessary, either. A lot of it is just to make the browser work. Even Microsoft, with all of its resources, couldn't manage to maintain their own browser (Internet Explorer, pre-2020 Edge), and so they switched to just modifying Chromium.

### Security

If you are not being targeted by actual browser exploits, then Web security is fortunately rather simple.

1. **Keep your browser up to date.** This is the most important thing you can do to keep your browser secure. Browsers are updated frequently to patch security vulnerabilities. Keeping an old version of a browser is not like leaving your front door unlocked, it's like hacking your door to pieces and leaving the debris in front of your house.
2. **Manage your secrets properly.** See the [Secrets Management](#secrets-management) section for more information.
3. **Install and use a good content blocker.** Content blockers, aka ad blockers, not only block ads, but also block malicious scripts and trackers. I recommend [uBlock Origin](https://github.com/gorhill/uBlock) for this purpose.

#### Things to keep in mind

A rather well-known fact is that your browser's "Incognito Mode" or whatever it's called has no effect on privacy or security whatsoever. It is simply there to temporarily stop logging your browsing history and cookies. It does not stop websites from tracking you, nor does it stop your ISP from seeing what you're doing, [nor does it stop Google from spying on you](https://www.npr.org/2024/04/01/1242019127/google-incognito-mode-settlement-search-history).


Other things:
- Your browser's "Do Not Track" setting is a joke. Websites can and will ignore it.
- Browser fingerprinting is a thing. It is a method of tracking you based on your browser's unique configuration. You can test your browser's fingerprint [here](https://coveryourtracks.eff.org/). Browser fingerprinting is nigh impossible to evade, so there's not much point in trying to evade it.
- By default, **your Internet Service Provider can see the domain names of every website you visit**. This is, for example, how they can block websites. The simplest way to avoid this is to change your DNS server to a third-party one (more information in the [DNS](#dns) section).

Barring very rare browser exploits, websites can't "hack you". They can't magically install viruses on your computer. They can't steal your data unless you give it to them through some mean. If you went on a website and now your computer is acting weird, it's not because the website "hacked" you, it's because you downloaded something from the website and ran it. The same goes for social media accounts: they can't be "hacked" unless you give your credentials to someone.

### Privacy

## Secrets Management

### Password Managers

#### Passkeys & U2F

## DNS

## The IP Protocol

### IPv4

### IPv6

## VPNs

## Tor and Hidden Services

## Communication

### Email

# Encryption

## Please don't use PGP

# Programming