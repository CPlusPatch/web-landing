---
title: Opsec & You: Protection Against Feds, Hackers, and Everyone Else
created_at: 1700020246000
image: /images/assets/bsod_joke.png
description: In this guide I explain how to secure your personal digital devices against high-level adversaries, such as governments.
author: Jesse W
author_image: /images/avatars/jessew.png
author_handle: @CPlusPatch
---

> **Note:** This guide is a work in progress. It is not yet complete.

# Introduction

When dealing with the digital world, it is important to understand that you are not alone. There are many people out there who want to get their hands on your data, and they will do anything to get it. This includes governments, hackers, and even your own family members. In this guide, I will explain how to protect yourself from these threats.

You may find this guide interesting if:

- You are being targeted or expect to be targeted by state agents
- You are a journalist or activist
- You are a whistleblower
- You would like to learn more about digital security


# Linux and FOSS

FOSS (Free and Open Source Software) is a type of software that is free to use, modify, and distribute. It is often more secure than proprietary software, as it is open to public scrutiny. Linux is a FOSS operating system, and is the most popular FOSS operating system in the world.

You **should** use the Linux operating system and FOSS software whenever possible. This is because it is more secure than proprietary software, and is less likely to contain backdoors or other malicious code. It is also more customizable, and can be configured to your liking. [Windows is known to contain multiple backdoors from the likes of the NSA](https://arstechnica.com/information-technology/2017/04/nsa-backdoor-detected-on-55000-windows-boxes-can-now-be-remotely-removed/) and, being proprietary, cannot be audited by the public.

The switch from Windows to Linux will require some computer knowledge about how computers function. If you are not comfortable with this, please document yourself on installation of Linux and basic command line usage. My personal distribution recommendation is [EndeavourOS](https://endeavouros.com/), which is a user-friendly derivative of [Arch Linux](https://archlinux.org/). Arch Linux is a rolling release distribution, which means that it is constantly updated with the latest software. This is important for security, as it means that you will always have the latest security patches.

Arch Linux also has an in-depth wiki that can help you with any issues you may have. You can find it [here](https://wiki.archlinux.org/). Commands used in this guide will be written for Arch Linux, but will work on most other distributions as well.

> **Note**: If you want maximum security, you should use [Qubes OS](https://www.qubes-os.org/). However, Qubes OS is not user-friendly and requires a lot of knowledge to use. I do not recommend it unless you are a journalist or activist.

## Mobile Operating System

Do **not** use the iOS operating system (and therefore any iPhone), as it is fully proprietary and gives you no control over your data. You should use an Android device instead.

### Custom ROMs

The OEM Android operating system that comes preloaded with your phone most likely has very poor security and contains bloatware: this is because manufacturers often add their own software to Android, which can contain backdoors and other malicious code. You should install a custom ROM on your phone to remove this bloatware and improve security.

The most secure phone to own is the [Google Pixel](https://pixel.google.com), as it is the only phone that is officially supported by the [GrapheneOS](https://grapheneos.org/) project. GrapheneOS is a FOSS operating system for Android that is designed with security in mind. It is based on the Android Open Source Project (AOSP), and is hardened to protect against attacks. It is the only Android variant that is designed to be secure.

If you cannot purchase a Pixel device, you should purchase a device that is supported by [LineageOS](https://lineageos.org/). LineageOS is not nearly as secure as GrapheneOS, but it is still a marginal improvement over stock Android. You can find a list of supported devices [here](https://wiki.lineageos.org/devices/).

Using an Android device without a custom ROM is **worse** than using an iPhone. You should **always** have a good custom ROM installed.

### Installing Custom ROMs

Installing custom ROMs is slightly different for each device, but it involves unlocking the bootloader and flashing a custom recovery. You can find instructions for your device on the [GrapheneOS](https://grapheneos.org/install) and [LineageOS](https://wiki.lineageos.org/devices/) websites.

This operation will **always** wipe all the data on your phone clean. You should back up your data before proceeding.

Once you have installed the ROM, it is recommended to lock your bootloader if you do not intend to root your phone. This prevents attackers from messing with your device (by tampering with the bootloader to add a rootkit for example) without wiping it clean.

# Passwords

The first step to securing your digital life is to secure your passwords. Passwords are the first line of defense against attackers, and are often the weakest link in a security chain. If you have a weak password, it is easy for an attacker to guess it and gain access to your account.

## Securing Passwords

You **must never remember all your passwords by yourself**. You should use a password manager to store them for you. This is because humans are bad at remembering passwords, and will often use the same password for multiple accounts. This is a bad idea, as it means that if one account is compromised, all of your accounts are compromised.

Good password managers include:

- [KeepassXC](https://keepassxc.org/), for offline storage on desktop
- [Bitwarden](https://bitwarden.com/), for online storage on both desktop and mobile
- [KeePassDX](https://www.keepassdx.com/), for offline storage on mobile
- [KeePassium](https://keepassium.com/), for offline storage on iOS

All of these password managers are **end-to-end encrypted**, which means that they can only be decrypted by you. This means that even if the password manager is compromised, your passwords will still be safe. All three Keepass derivatives only store data on your local device, but Bitwarden synchronises it across a cloud server (which you can manage yourself if you wish). This cloud synchronisation is secure, as the data is encrypted before it is sent to the server.

You **must** always use a secure, 25+ character password for your password manager, **AND** some form of two-factor authentication.

### Two Factor Authentication

Your password manager should ideally have three forms of authentication:

- Something you know (such as a password)
- Something you have (such as a hardware security key, more info on these in [Hardware Security](#hardware-security))
- Something you are (such as a fingerprint)

Biometrics should only be used if you have the other two forms of authentication as well. This is because in a lot of jurisdictions, you can be forced to unlock your device with your fingerprint, but not with a password. This means that if you only have biometrics, you can be forced to unlock your device.

You **must** lock your password manager's vault (using the above authentication methods) at all times when you are not using it. If you cannot be bothered to add all three methods, in most cases a PIN is sufficient.

### Password Generation

You should **never** generate your own passwords. Most password managers have a "password generator", such as the one in Bitwarden:
![Screenshot of the Bitwarden password generator dialog](/images/articles/opsec-and-you/bitwarden-password-generation.png)

You should use this to generate a secure password for each account. You should **never** use the same password for multiple accounts.

For each account you have, you should also enable some kind of two-factor authentication such as TOTP and store the backup codes in your password manager. This is because if you lose access to your two-factor authentication device, you will be locked out of your account. Most password managers can also generate TOTP codes on their own, which you should use when possible.

# Hardware Security

## Hardware Security Keys

Hardware security keys are small devices that you can plug into your computer or phone to authenticate yourself. They are more secure than software-based two-factor authentication, as they are harder to compromise. They are also more convenient, as you do not need to type in a code every time you log in.

Disadvantages of a hardware security may be:
- They are more expensive than software-based 2FA
- They are not supported by all services

However, as long as they do not fall into the wrong hands, they are more secure than software-based 2FA.

These devices usually come in pairs or have a way to make backups: **be sure to make a backup and store it in a place it will never be found**. If you lose your hardware security key, you will be locked out of your accounts. If you need to destroy your hardware security key to prevent it from being compromised, you will need a backup to regain access to your accounts.

## Secure Boot

Secure Boot is a feature that is present on most modern computers. It prevents the computer from booting into an operating system that is not signed by a trusted key. This prevents attackers from installing a rootkit on your computer, as the rootkit will not be signed by the trusted key.

You should **always** enable Secure Boot on your computer, **after you have successfully signed your operating system**. An operating system that is not signed by your own Secure Boot keys **will not boot** and will require you to disable Secure Boot to boot into it.

You should also add a BIOS password on your BIOS, to prevent attackers from disabling Secure Boot. This password should be **different** from your disk encryption password.

> **Paranoid Mode:** When booting up your computer after being away from it, you should check that your BIOS password still works and has not been reset. This is because some motherboards can be manipulated using electrical equipent to reset the BIOS password. If your BIOS password has been reset, you should assume that your computer has been compromised and take appropriate action.

A guide on enabling Secure Boot on Arch Linux can be found [here](https://wiki.archlinux.org/title/Secure_Boot). The following is a short summary of the steps required:

1. Install the `sbsigntools` and `efitools` packages:

```bash
sudo pacman -S sbctl efitools
```
2. Backup your existing keys:

```bash
for var in PK KEK db dbx ; do efi-readvar -v $var -o old_${var}.esl ; done
```
3. Reboot into the BIOS and set Secure Boot to "setup mode". On some motherboards, setup mode may be entered by simply clearing out all existing keys.
4. Check the Secure Boot status with `sbctl status` command. It should say that Setup Mode is **ENABLED**. If not, you should reboot into the BIOS and set it to setup mode.
5. Create your own secure boot keys. They will be stored in `/usr/share/secureboot/keys`

```bash
sbctl create-keys
```
6. Enroll your keys into the firmware:

> **WARNING**: If you remove the `-m` flag, this will not enroll Microsoft's keys, which has the potential to brick your system. You do not need to exclude these keys as they are not a security risk. Keep the `-m` flag.

```bash
sbctl enroll-keys -m
```
7. Now check the Secure Boot status:

```bash
sbctl status
```

Keys should be enrolled.

8. Sign your kernel
This step is required for your system to boot and must be done on every kernel update. You can use automated tools, such as pacman hooks, to do this signing automatically.
    
```bash
sbctl verify
# Sign all the files shown by sbctl verify
sbctl sign -s /boot/vmlinuz-linux
sbctl sign -s /boot/EFI/BOOT/BOOTX64.EFI
...
```

9. Reboot your system (make sure secure boot is enabled) and check that it boots correctly. If it does, run `sbctl status` again to check that Secure Boot is still enabled.

## Disk Encryption

Disk encryption is a method of encrypting your hard drive so that it cannot be read without a password. This is important, as it prevents attackers from reading your data if they gain physical access to your computer.

If you do not have disk encryption enabled, you should **always** assume that your computer has been compromised if it is out of your sight. This is because it is trivial to install a rootkit on an unencrypted computer, and it is impossible to detect without physical access to the computer.

To reiterate: **you should always have disk encryption enabled**. If a computer does not have disk encryption enabled, anybody can gain root access to it without your knowledge (as long as they are physically present).

### LUKS

LUKS is a disk encryption standard that is used by most Linux distributions. It is one of the most secure disk encryption standard available, but there are others. Typically, when installing your distribution, you will be asked if you want to encrypt your disk. You should **always** say yes to this question.

Use a strong password for your disk encryption. This password should be **different** from your BIOS password, and be large and impossible to guess.

There are other methods to encrypt your disk, such as VeraCrypt, but LUKS is a great tool for disk encryption. Check the Arch Wiki for more information on how to encrypt existing devices with LUKS.

#### LUKS TPM Unlocking

Automatically unlocking LUKS with your TPM lets you have full disk encryption without having to type in a password every time you boot your computer. This is a great feature, as it means that your computer will be encrypted even if you are not there to type in the password. I generally do not use it, but it might be useful if you have trouble remembering passwords.

This feature may not be available on all computers, and requires a TPM 2.0 chip. Most recent computers have this chip, but some older ones do not.

##### Is this secure?

Using TPM LUKS unlocking prevents anybody from decrypting your drive after it is removed from the mainboard. If your computer is booted, your password screen should prevent any attackers from stealing your data, but exploits can still be performed against your OS through USB devices for example.

#### LUKS Hardware Key Unlocking

You may also use a hardware security key as described in [Hardware Security Keys](#hardware-security-keys) to unlock your LUKS partition. Make sure to be able to destroy the key if it is compromised.

## Secure Boot and Disk Encryption

Secure Boot and Disk Encryption **MUST** be used together. Both work hand-in-hand, and one without the other leads to easy compromise of your system by anyone with physical access to it.

# Software Security

## Updates

You should **always** keep your software up to date. This is because software updates often contain security patches, and not updating your software means that you are vulnerable to known exploits.

Using "old" software for the sake of stability is often a bad idea for security. Even if some fixes are backported, it is often not enough to protect you from attackers. You should **always** use the latest version of your software.

## Software Sources

Proprietary software **SHOULD** be avoided like the plague for security reasons. This is because proprietary software is not open to public scrutiny, and can contain backdoors and other malicious code. You should **always** use FOSS software when possible.

### Desktop

You should use the official repositories of your distribution to install software. This is because the official repositories are maintained by the distribution maintainers, and are therefore more secure than third-party repositories.

If you do not trust an application, install it through [Flatpak](https://flatpak.org/) or [Snap](https://snapcraft.io/). These are sandboxed application formats that prevent applications from accessing your data without your permission. They are also more secure than traditional package managers, as they are signed by the developers and cannot be tampered with.

> **Note**: Flatpak apps can give themselves any initial set of permissions on install (up to having the same level of access as a regular package), but they must ask for additional permissions at runtime. It is a good idea to remove app permissions if they do not need them through your desktop's Flatpak manager.

An application that is not sandboxed has access to **EVERY** file on your computer that you also have access to. This means that if you install a malicious application, it can read all your files and send them to an attacker. This is why you should **always** use sandboxed applications when possible.

### Mobile

On Android, the Google Play Store is the most secure source of applications. This is because Google has designed the Play Store to be secure, and will attempt to remove malicious applications from it. You should **always** vet applications installed from any source if possible.

Another alternative is F-Droid, which is probably fine for security [but is not as secure as the Play Store.](https://privsec.dev/posts/android/f-droid-security-issues/). Both app stores can and do contain malware (although F-Droid has less overall).

Applications on Android are always well-sandboxed, so most of the time you do not need to worry about them doing things if they are not allowed to. However, you should still be careful about what permissions you give to applications. Android security is not perfect, and it is possible for applications to bypass the sandboxing system.

# Communication

If you are using popular messaging tools such as Discord, Facebook, or Instagram, you should **always** assume that your messages are being read by someone else. This is because these applications are not end-to-end encrypted, and can be read by the company that owns them.

WhatsApp is end-to-end encrypted, but is not open-source, so you should **always** assume that it is compromised.

Good messaging apps are:

- [Signal](https://signal.org/), for mobile and desktop
- [Element](https://element.io/), for mobile and desktop (client for the Matrix platform)
- [Threema](https://threema.ch/en), for mobile and desktop

For more information about what state agents can access in other messaging apps, [check this article on revealed FBI documents](https://therecord.media/fbi-document-shows-what-data-can-be-obtained-from-encrypted-messaging-apps). Do **NOT** under any circumstances share sensitive information on any platform that is not fully end-to-end encrypted and open-source.

State agents **CAN** and **WILL** compel companies to give them access to your data. This is why you should **always** use end-to-end encrypted messaging apps, as the companies cannot give out your data since they do not have it (it is encrypted).

If the client used to access a service is not open-source, you should **always** assume that it is compromised. This is because it is impossible to verify that the client is not sending your data to a third party, even if the data itself is encrypted during transit.

> **Note**: Security and Anonymity are two different things. You can be secure without being anonymous, and you can be anonymous without being secure. Both should be used together for maximum protection.

## Signal

[Signal](https://signal.org/) is a FOSS messaging app that is end-to-end encrypted. It is the most secure messaging app available, and known as the "gold standard" for encryption protocols. It is available on both mobile and desktop, and is easy to use.

The only disadvantages of Signal are its centralization and its phone number requirement. Signal requires a phone number to register, which means that you cannot use it anonymously very easily.

## Matrix

The [Matrix](https://matrix.org) ecosystem is a federated network for encrypted messaging. While support for Matrix is not as widespread as other messaging platforms, it is the best platform for decentralized messaging as servers can be self-hosted.

Matrix is not as secure as Signal, as it uses a different encryption protocol. However, it is still secure enough for most use cases.

Matrix is also a bit rougher around the edges compared to Signal, as federation adds a lot of jank.

## Threema

[Threema](https://threema.ch/en) is a FOSS messaging app that is end-to-end encrypted. It is available on both mobile and desktop, and is easy to use. However, do note that it is paid.

# Browsing

## Web Browsers

You should **always** use a FOSS web browser that is **sandboxed** as much as it possibly can be. Web Browsers are among the most sensitive applications on your computer, as they can execute arbitrary code from the internet.

Good web browsers include:

- [Firefox](https://firefox.com), for desktop and mobile
- [Fennec](https://f-droid.org/en/packages/org.mozilla.fennec_fdroid/), for mobile
- [Ungoogled Chromium](https://github.com/ungoogled-software/ungoogled-chromium)

Bad web browsers include:

- [Google Chrome](https://google.com/chrome), as it is full of proprietary tracking code by Google
- [Microsoft Edge](https://microsoft.com/edge), and any proprietary derivatives of Chromium (such as Samsung Internet, Arc, etc.)
- [Brave](https://brave.com), as it has a track record of overall shadyness, and is not as secure as it claims to be
- [Safari](https://apple.com/safari), as it is proprietary software by Apple.

## Tor Browser

The [Tor Browser](https://torproject.org) is a web browser that is designed to be secure and anonymous. It is based on Firefox, and is the most secure web browser available. It is also the only web browser that is designed to be anonymous.

The Tor Browser uses the Tor network, which is designed from the ground up to be as anonymous and secure as possible. It is the **only** way to browse the internet anonymously with no third party to spy on you.

While on Tor, you should **not**:

- Log into any clearweb accounts
- Disclose Personally Identifiable Information (PII)
- Deanonymize yourself through any means

Tor is not a magic bullet, and you should still be careful about what you do on it.

Tor also contains a number of hidden websites that are only accessible through the Tor network. These websites are known as the "dark web", and are often used for illegal activities. You may use these websites for many things including anonymous communication, exchanging cryptocurrency, buying illicit materials, and more. A Tor website ends with `.onion` instead of `.com` or `.org` as you may be used to.

### Bridge Mode

By default, your ISP (Internet Service Provider, such as Comcast or AT&T) is able to see that you are connecting through Tor, although it cannot see *what you are doing* or *what sites you are visiting* on Tor. To prevent this, you can spoof your connection by activating "bridge mode" in the Tor Browser settings. This is useful in countries with heavy internet censorship, such as the People's Republic of China.

### Paranoid Section

You may desire to route your entire internet traffic through Tor for the highest anonymity possible: on mobile, this can be done through [Orbot](https://support.torproject.org/glossary/orbot/); on desktop, you should look up how to do it for your distribution.

## VPNs

VPNs (Virtual Private Networks) are a way to route your internet traffic through a third party. This can be useful for bypassing censorship, but is **not** a good way to be anonymous. VPNs are often used by people who do not know what they are doing, but they can be useful in some cases.

If you use a VPN, you should configure your computer to **never connect to the internet without it**.

Good VPN services include:

- [Mullvad](https://mullvad.net/en)
- Some other less well known providers

VPN services that try to make false promises to you should probably not be trusted. In general, here is what a VPN **CAN** do:

- Hide traffic **between you and the VPN server** in a better way than it is normally hidden
- Hide your IP address from sites you visit
- Make being deanonymized harder
- Improve your security slightly without being too much effort

Here is what a VPN **CANNOT** do:

- Operate without being able to siphon your web traffic
- Fully anonymize you
- Hide all your traffic

Here is what a VPN company **WILL NOT** do, no matter what their marketing tells you:

- Go to prison for you
- Resist subpoenas from law enforcement agencies

### Purchasing VPNs

When purchasing VPNs, look for providers that let you pay anonymously: Mullvad for example lets you pay in cryptocurrency or by mailing cash. Credit card transactions are **not private** and can be very easily linked to you.

## DNS

When you visit a website, your computer needs to know the IP address of the website. This is done through a DNS (Domain Name System) server. By default, your computer will use your ISP's DNS server, which is **not** secure.

You should **always** use a custom DNS provider that supports either DNS over HTTPS or DNS over QUIC/HTTP3. These protocols encrypt your DNS traffic, which prevents your ISP from seeing what websites you are visiting. However, it does not prevent your DNS provider from seeing your DNS traffic.

DNS traffic includes domain names of sites you are visiting and your IP address. It does not include the full URL of the site you are visiting, nor the contents of your activities, but it can be used to deanonymize you.

Unsecure DNS traffic is also frequently blocked by ISPs for censorship purposes, so using a secure DNS provider can help you bypass censorship. However, do note that ISPs have other methods of spying on your traffic, and using secure DNS is not a panacea.

Good DNS providers include:

- [Cloudflare](https://1.1.1.1)
- [Quad9](https://quad9.net/)
- [NextDNS](https://nextdns.io/)
- [AdGuard](https://adguard.com/en/adguard-dns/overview.html)

If you change your DNS system-wide, **make sure the changes are applied on boot and for every new connection**.

> **Note**: If you are using Tor, you do not need to change your DNS settings, as Tor does not use DNS.

# Hardening your Kernel

The Linux kernel is the core of the Linux operating system. It is responsible for managing hardware and software resources, and is the most important part of the operating system. It is also the most vulnerable part of the operating system, as it is the most complex.

You should always disable unnecessary kernel features to reduce the attack surface of your kernel. This is especially important if you are using a custom kernel, as custom kernels often have more features enabled than the default kernel.

To fully secure your kernel, you can [follow this comprehensive guide by Madaidan](https://madaidans-insecurities.github.io/guides/linux-hardening.html). It includes:

- Installing a hardened custom kernel, such as `linux-hardened`
- Enable Lockdown Mode
- Disabling old and useless drivers
- Disabling unnecessary filesystems
- Changing kernel options to improve security

> **Note**: This guide is rather pessimistic about the security of Linux. While it is true that Linux is not as secure as it could be, it is still more secure than Windows or macOS. You should still follow this guide, but do not be afraid to use Linux. Ultimately, there is no perfect OS.

# Shredding Data

When you delete data by using either `rm` or the system's file manager, the data is not actually deleted. Instead, the file is marked as deleted, and the space it occupies is marked as free. This means that the data is still on your hard drive, and can be recovered by an attacker.

If your computer is compromised, an attacker can use this to recover your data. This is why you should **always** shred your data before deleting it.

Always use special software (or CLI tools) to shred sensitive files such as:

- [shred](https://www.gnu.org/software/coreutils/manual/html_node/shred-invocation.html)
- [srm](https://srm.sourceforge.io/)
- [Raider](https://github.com/ADBeveridge/raider)

# Services to Avoid

Most proprietary service should be avoided as much as possible, but these companies are some of the worst offenders.

## Google

Google is a company that is known to spy on its users. You should **never** use any of their services, as they are not private, and Google **WILL** share everything it can with law enforcement. This includes:

- Google Search
- Google Chrome
- Google Drive
- Google Docs
- Google Maps
- Google Photos
- GMail
- YouTube
- Hundreds more of google services

On Android, access the Google Play Store through a burner Google account if possible.

The Google Pixel is a hardware product with good hardware security, but you should **never** use it with Google services. Instead, you should install a custom ROM on it and use it with FOSS software. Please see [Mobile Operating System](#mobile-operating-system) for more information.

## Facebook

Facebook is widely known for having horrible privacy and repeatedly exploiting its users for extra money. You should **never** use a Facebook service, or even worse, share PII with Facebook.

This includes:

- Facebook
- Instagram
- WhatsApp
- Messenger
- Oculus
- Threads
- Any other Facebook service

# CPU Backdoors

Most modern CPUs contain backdoors that can be used to spy on you. These backdoors are not well documented, and are often not even known about. This means that it is impossible to know if your CPU is spying on you.

The only way to be sure that your CPU is not spying on you is to use an open-source CPU, such as the [RISC-V](https://riscv.org/) architecture. However, these CPUs are not yet widely available for consumer use, and are not very powerful.

Here are the different types of backdoors that are known to exist:

- [Intel Management Engine](https://en.wikipedia.org/wiki/Intel_Management_Engine)
- [AMD Platform Security Processor](https://en.wikipedia.org/wiki/AMD_Platform_Security_Processor)
- [ARM TrustZone](https://en.wikipedia.org/wiki/ARM_architecture#TrustZone)

Virtually all modern CPUs contain at least one of these backdoors, and it is often impossible to disable them. In the cases that it is possible to disable them, you probably should not, as they contain important security features embedded inside them (such as Intel BootGuard for the Intel ME).

Unfortunately, there is no way to securely deal with these pests. However, you may be reassured by the fact that they are very hard to be used by state agents or companies to spy on you, as these things do not report to anybody but the CPU itself (even if they can access the internet).

## Disabling the Intel Management Engine

The Intel Management Engine is a backdoor that is present on all Intel CPUs. It is a small computer inside your computer that has full access to your computer's memory and network. It is not possible to disable it entirely without breaking your CPU, but it is possible to disable some of its features.

You should **never** disable the Intel Management Engine entirely, as it contains important security features that are required for your computer to boot. However, you can disable some of its features, such as the Active Management Technology (AMT) and the Local Management Service (LMS).

To do this, you will need to install [me_cleaner](https://github.com/corna/me_cleaner), acquire a copy of your ME firmware, and modify it to disable the features you want to disable. This is a very complicated process, and you should only do it if you know what you are doing.

Once you have modified the firmware, you will need to flash it back using an SPI programmer. `me_cleaner` does not disable the Intel ME entirely, but effectively nullifies it after the system has booted.

You'll have to use a CPU architecture such as the RISC-V if you want to be sure that your CPU is safe. Fortunately, Linux is well supported on RISC-V (and is just about the only OS that supports it), so installation of some distros is possible.

# Payment Systems

## Bank-Related Payments

If you are making payments through a bank, you should **always** assume that your bank is spying on you. This is because banks are required by law to report suspicious activity to the government, and will do so if they suspect you of doing something illegal.

Banks, like any other entity, can also be compromised by hacking groups. All of this means that if you are doing something reprehensive, you should **never** use a bank to do it.

Common Bank-Related payment methods:

- Credit Cards
- Debit Cards
- Wire Transfer

## Cryptocurrency

Cryptocurrency is a decentralized payment system that is not controlled by any government or company. It is the most secure payment system available, however there are a number of things to keep in mind when using it.

Cryptocurrency is **not** anonymous. It is pseudonymous, which means that it is not linked to your real identity, but it is still possible to deanonymize you if you are not careful. You should **always** assume that your cryptocurrency transactions are being watched by someone else.

**Every** payment made with cryptocurrency is public to the whole world because of how blockchain technology works. Most popular cryptocurrencies are also not fungible, which means that it is possible to trace the history of a coin. This means that if you receive a coin that has been used for illegal activities, you may be accused of doing those activities yourself.

To be anonymous, you **should not** use currencies such as Ethereum or Bitcoin: instead, you should use currencies like as Monero. These currencies are designed to be anonymous, and provide a much higher level of anonymity than other currencies.

### Cryptocurrency Scams

Cryptocurrency is a very new technology, and is therefore very easy to scam people with. You should **always** be careful when dealing with cryptocurrency, as it is very easy to lose your money.

If somebody is offering you a deal that is too good to be true, it probably is. You should **never** trust anybody with your cryptocurrency, as it is very easy to steal.

Transferring money by cryptocurrency is always done using a simple transaction towards a specific address. If somebody is asking you to send them money using a different method, it is a scam.

Purchase screens typically look like this:

![QR Code with wallet address at the bottom](/images/articles/opsec-and-you/crypto-purchase.png)

### Cryptocurrency Exchanges

You should avoid online crypto exchanges. While they are very convenient, they are often not secure, and can be hacked. You should **never** store your cryptocurrency on an exchange, as it is very easy to lose it. Your cryptocurrency should be controlled solely by you and you only, stored in a wallet that you control.

**DO NOT** use online wallets, as they are controlled by a third party and can be compromised. You should **always** use a wallet that you control, and **never** share your private keys with anybody.

If somebody asks you for your wallet passphrase or private key, **IT IS A SCAM**. Anybody with access to that data can steal your cryptocurrency.

**THERE ARE NO LAWS GOVERNING CRYPTOCURRENCY**. If you lose your cryptocurrency, you will not be able to get it back. You should **always** be careful when dealing with cryptocurrency, as it is very easy to lose your money.

> **Note**: If you are using cryptocurrency to do something reprehensive or illegal, you should **never** use an online exchange to purchase it. Instead, you should use a peer-to-peer exchange, ideally via Tor. This is because exchanges are required by law to report suspicious activity to the government, and will do so if they suspect you of doing something illegal.


# Good Practices

- **Never** share PII (Personally Identifiable Information) with anybody over unencrypted channels
- **Never** share PII with anybody you do not trust
- Always assume everybody is a threat by default
- Never use the same email accounts for personal and "business" use
- **Avoid** using the same IP address for personal and "business" use
- **Never** use your real name on the internet

## If you are arrested

If you are arrested, you should **never** talk to the police. You should **always** ask for a lawyer, and **never** answer any questions. You should also **never** consent to a search of your property (unless they have a warrant), as this can be used against you in court.

Law enforcement **can and will lie to you**, offer you bogus "deals", try to trick you into talking, and more. You should **never** trust them, and **never** talk to them without a lawyer present. In some countries, such as the United States, you have the right to remain silent, and you should **always** exercise this right.

**DO NOT** admit to anything and **do not** comply with any orders.

# Conclusion

This guide is not exhaustive, and there are many other things you can do to improve your security. However, if you follow this guide, you will be almost certainly more private and secure than 99.99% of the population.

New attacks and security vulnerabilities are discovered every day, so you should always keep yourself up to date on the latest security news. You should also keep your software up to date, as security patches are released frequently.

If you have any questions, you can contact me on [Matrix](https://matrix.to/#/@jesse:cpluspatch.dev).

Be safe out there.