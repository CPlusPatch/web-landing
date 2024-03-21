---
title: Developing Lysand, a new federated server
created_at: 1700020246000
image: https://opengraph.githubassets.com/0473f3e13c155c834c85ea1188a44fc1191a12fc96220b0acf1301002b15f462/CPlusPatch/lysand
description: I write about my experience developing Lysand, a new federated server for the Fediverse, and its accompanying protocol
author: Jesse W
author_image: /images/avatars/jessew.png
author_handle: @CPlusPatch
---

Hello! I'm Jesse, and I'm the lead developer of Lysand, a new federated server for the Fediverse. I'm also the lead developer of the Lysand protocol, which is the protocol that Lysand uses to communicate with other servers. In this post, I'll be talking about my experience developing Lysand and the Lysand protocol, and what I've learned from it.

# Part One: The Lysand Protocol

## Why is this needed?

In short: because ActivityPub sucks. It's a bloated, overcomplicated mess that is hard to implement and hard to understand. ActivityPub suffers from a lack of clear specifications, which has led to a lot of confusion and a lot of different implementations of the same thing. This is a problem because it makes it hard to write servers that work with all the others without copying those implementations, which is never a good sign of a healthy protocol.

Also, ActivityPub uses JSON-LD, which is a terrible format for a protocol. It's slow, it's hard to parse, and it's hard to understand. It's also not very human-readable, which is a problem because it makes it hard to debug and hard to understand what's going on.

## What is the Lysand Protocol?

After trying to implement ActivityPub, I decided to try and write my own protocol. I wanted to make something that was simple, easy to understand, and easy to implement. I also wanted to make something that was human-readable, so that it would be easy to debug and easy to understand what's going on.

The Lysand protocol works in a similar way as ActivityPub, with inboxes and "activities", but it's much simpler. It uses a simple JSON format, which is easy to parse and easy to understand. It's rather easy to add to any app with a couple of HTTP endpoints, which makes it easy to implement.

Lysand has official specifications for features such as Polls, Custom Emojis, Cryptographic Signatures, Rich Text, Image Metadata, Username Changes, and more. These specifications are written in a simple, easy-to-understand format, which makes it easy to implement them in any app.

> You can find this spec at [the lysand website](https://lysand.org).

## What is it used for?

Similar to what ActivityPub does, Lysand is used as a way to exchange data between servers. However, this is more focused on blogging-style media, such as Twitter or Tumblr. It's not meant to be used for things like chat or video calls, for that you'd better use something like [Element Call](https://call.element.io/) or [Signal](https://signal.org/).

I dont really like the idea of having a single protocol for every single platform, because it makes interop considerably harder and it's also worse for users if they're not using the right client for the media they're using. If you use a video sharing platform client to browse John Mastodon's tweets, you're not gonna have a very good experience.

## Will you be adding new versions?

Yes. I plan to add new versions of the protocol as new features are added to Lysand.

# Writing the Spec

A warm afternoon in early November, I began writing an autistic infodump of a spec for Lysand. After a few hours of typing, typing and more typing, I had a good draft of the spec.

Initially, this was hosted on a GitHub repository as a single Markdown file: I sent that over on the Fediverse and to a couple friends, who gave me a little feedback: after a couple more drafts, I had something I was happier with. Over the course of the next few weeks, I continued to work on the spec, adding new features and fixing bugs.

After a while (today), I decided to move the spec to a dedicated website, which is where it is now at [lysand.org](https://lysand.org). This is because I wanted to make it easier to read and understand: GitHub's Markdown formatting is *great*, but it's good to have a dedicated website for it explaining things.

## Difficulties

Writing the spec was a bit difficult at times, because I had to make sure that everything was clear and easy to understand. I also had to make sure that everything was consistent, and that there were no contradictions or ambiguities. As I had amassed a single gigantic 100,000-character Markdown file, this became a bit tricky. However, I managed to get through it, and I'm happy with the result.

# Part Two: The Lysand Server

## A Flagship Server

Originally, the Lysand server was meant to be an ActivityPub enabled server for the Fediverse with Mastodon API compatibility: I did not like what other servers like Misskey or Mastodon were doing, so I sought to make my own server that would be better than them. I wanted to make a server that was easy to use, easy to understand, and easy to extend.

I think I've mostly succeeded in making something simple but fast, but implementing ActivityPub proved really challenging. The docs were never clear about how everything worked, and it seemed like every server implemented it differently. Out of this frustration, I decided to make my own protocol and switch Lysand Server to it.

## Lysand's New Protocol

After writing the new protocol, I began implementing it in Lysand Server. This proved far easier than implementing ActivityPub, and I was able to get it working in a couple of days. I had purposefully made Lysand Protocol to be easy to implement, so this turned out pretty well.

I was also happy to not be using RSA anymore (I have an irrational fear of RSA and prefer using newer algorithms like Ed25519). Maybe I'll write a blog post about that someday. Along the way, I added a CLI to interact with the database so you can create new users without having to manually open Postgres. This will become a fully featured scriptable tool later on.

## Configuration Options

I like configuration options: I know a couple of fedi server admins, so I have a couple ideas of useful things to add. For example, Lysand has or is planning to implement the following features.

- [x] Regex post, bio and username filters to prevent usage of certain patterns
- [x] S3 or local file upload support
- [ ] Customizable OpenID providers for login
- [ ] Emails to moderators on moderation actions
- [ ] CLI commands to manage users and posts

## Difficulties

There were not many difficulties I encountered while writing the server, but it was mostly a time-consuming effort. To this day, the server's federation and API are still incomplete, but this is mostly because the Mastodon API is very big and I'd rather get that done first, than difficulties in writing the code.

Also, there's a bug in [Bun](https://bun.sh), the runtime I use for Lysand, which causes the server to crash whenever I use it, so I'm waiting for that to get resolved before I can continue working on it.

## Comparison to Other Servers

From my testing, Lysand is pretty fast: faster than Pleroma, Mastodon and Misskey. It's also pretty lightweight, using only 100 megabytes of storage before being compiled (from `node_modules` bloat).

As it's not finished, I can't fully compare it to other servers, but I think it's pretty good so far. I'm hoping to get it finished soon, so I can start working on a client.

# Conclusion

I have learned a lot from writing Lysand and the Lysand protocol. I had never written a spec before, so that was a new experience for me. I also had never tried to write a big server project like this, which was a very enriching experience.

I'm hoping to get Lysand Server finished soon, so I can fully release it and start working on a client. (it's fully FOSS by the way, available at [this GitHub repo](https://github.com/lysand-org/lysand)). In the meantime, I hope you've enjoyed reading this post, and I hope you'll enjoy using Lysand when it's ready!

Goodbye!