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

This article is a refresh of my **Opsec & You** article, updated for 2024. It is a general and specific guide to security or anonymity on computers in general.

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

Passwords are easily the most important part of your online security. If someone gets your password for a service (unless you use [Passkeys or U2F](#passkeys--u2f)), they can do anything they want with your account. They can lock you out of it, they can steal your data, they can impersonate you, etc.

Here's some obvious advice, that you may or may not already know:
- **Don't use the same password for multiple services.** If one service gets hacked, then all of your accounts are compromised. This is usually done automatically: hackers make bots that try your email and password on as many services as they can. Data breaches **will** happen, so it's best to be prepared.
- **Passwords should be random and long (complex if possible)**: The longer and more random your password is, the harder it is to crack. A password like `password123` is cracked in literal milliseconds. A password like `a9b3c8d2e7f1g4h6i5j0keFey82` is, for all intents and purposes, physically impossible to crack. Having long passwords is more important than having complex passwords, but having both is best.
  - Do **NOT** use words or phrases as passwords, even if you replace letters with numbers or symbols. Password crackers are designed to crack these kinds of passwords automatically. This includes things like `P@ssw0rd` or `H@ck3r` or `ILoveDrinkingBleach`.

### Password Managers

Password managers are programs that store your passwords in a (hopefully) secure way. You **must not** use the same password for multiple services, and you sure as hell can't remember a 26-character random string for every website you sign up to, so you need a password manager.

There are many password managers. Most are good, some are bad. Here are some good ones:
- [**Bitwarden**](https://bitwarden.com/): Open-source, free, and has an excellent reputation. Self-hostable. End-to-end encrypted. Supports Passkeys/2FA
  - The built-in TOTP generator is behind a paywall, unless you self-host with [Vaultwarden](https://github.com/dani-garcia/vaultwarden).
- [**KeePassXC**](https://keepassxc.org/): Open-source, free, and has an excellent reputation. Exclusively offline, but you can sync the database to your other devices (like your phone) using a service like Nextcloud or Syncthing

Your browser's built-in password manager is not a good password manager. It is not end-to-end encrypted, so it's kind of like storing your passwords on a sticky note on your monitor. It's better than nothing, but not by much. (also, it's obviously locked to your browser/account, so good luck switching browsers)

#### Passkeys & U2F

You probably know about 2FA (Two-Factor Authentication). The most common form of 2FA is TOTP (Time-based One-Time Password), where you get a code from an app like Google Authenticator or Authy. This is good, but it's not perfect. TOTP codes can be phished, and they can be stolen if your phone is compromised.

Instead, U2F/Passkeys are a better form of 2FA. U2F is a standard for cryptographically secure tokens that can be used for 2FA instead of the TOTP code system. It is impossible to phish U2F, and it is impossible to steal U2F codes unless you physically steal the token. U2F is the most secure form of 2FA available. **U2F/Passkeys are cryptographically unphishable.** [Large corporations like Cloudflare have managed to parry phishing attacks that would have otherwise been successful, simply because they use U2F.](https://blog.cloudflare.com/2022-07-sms-phishing-attacks/)

##### Difference between U2F and Passkeys

U2F is the name of the *standard* for hardware tokens. U2F usually refers to hardware security keys (like Yubikeys), but it can also refer to other forms of hardware tokens. Passkeys are a form of U2F that are entirely digital, stored in your password manager or device.

If a website or app supports U2F, it will work with both hardware tokens and passkeys (even if the website does not explicitly support passkeys).

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