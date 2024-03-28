---
title: Lysand in March 2024 - Updates
created_at: 1711003713000
image: https://opengraph.githubassets.com/0473f3e13c155c834c85ea1188a44fc1191a12fc96220b0acf1301002b15f462/CPlusPatch/lysand
description: Writing about about the new work that's been done on Lysand since my November post
author: Jesse W
author_image: /images/avatars/jessew.png
author_handle: @CPlusPatch
---

Hello! I'm Jesse, and I am the lead developer for Lysand, a new federation protocol for web applications, and its reference implementation, Lysand Server. I wanted to share some updates with the work that I've been doing since my last post in November.

## Lysand 2.0

I have been working on the Lysand 2.0 protocol update, which is an update of minor consequences but contains breaking changes, so it became a major version update. The main changes are:
- Reworked the protocol documentation to be more clear and concise
- Simplified some objects like ContentFormat to have a more straightforward structure
- Removed some deprecated fields and objects
- More spec compliance rules for stricter implementations

You can find the updated protocol documentation [at the lysand spec website](https://lysand.org). For a Git diff of the changes, you can check out the [full comparison on GitHub](https://github.com/lysand-org/docs/compare/158ec6e...f11d51c).

## Work on Lysand Server

The reference implementation of the Lysand Protocol, Lysand server, has also seen some updates.

### New Developer

We have a new developer, [April](https://github.com/cutestnekoaqua)!

![April's GitHub avatar](https://avatars.githubusercontent.com/u/30842467)

April will be developing an ActivityPub bridge for the Lysand Server, which will optionally let Lysand servers federate with ActivityPub servers. This will be a great addition to the server, and I am excited to have her on the team!

### API Implementation Work

More work has been done on implementing the Mastodon API fully. As of right now, every important API that is commonly used is implemented and fully working, except for viewing and modifying individual notifications.

### More Refactors

I am very well known for my extensive and frequent big refactors to my projects to make sure they are as clean and maintainable as possible, and this one has been no exception.

A lot of the code that was previously inline or in a single file has been moved to a new package structure, where each package can be independently and automatically tested. Lots of things that would previously result in a cryptic error message now result in a helpful log message for server admins.

This has allowed me to supercharge the CLI into a full-featured and easy-to-use tool for managing the server, with special attention to easy scripting and accidental damage prevention: the new CLI help page can be found with `bun cli -h`, `bun cli --help` or `bun cli help`.

### New Tests

In addition to the new package structure, tests have been changed to be run without needing to start the server, which has made them faster and more reliable. This is good for development efficiency and also allows us to add automatic testing via GitHub Actions (coming soon).

### New Logging

Logging has been expanded to be more verbose and informative, and also now properly works with all the configuration options. Logs are written to `logs/requests.log`, and some are also logged to the console.

```toml
[logging]
# Log all requests (warning: this is a lot of data)
log_requests = false
# Log request and their contents (warning: this is a lot of data)
log_requests_verbose = false
# For GDPR compliance, you can disable logging of IPs
log_ip = false
```

### New OAuth Permissions Screen

When logging in with new OAuth apps, which is to say logging in with anything, a new permissions screen has been added to make it clear what the app is asking for. This is a security feature to make sure that you know what you are giving access to.

This screen will trigger whether you are logging in via username/password or through an OpenID provider.

![OAuth Permissions Screen](https://raw.githubusercontent.com/lysand-org/lysand/main/assets/redirect.webp)

### Bait Mode

After seeing [my friend Kio](https://kio.moe) have fun using Nginx to bait bots, I decided to add a fun feature to Lysand called Bait Mode. When enabled in the config, Lysand will respond to any requests from a configurable user-agent regex or IP address to a configurable file. By default, this is the entire script of the Bee Movie, but you can change it to anything you want.

```toml
[http]
base_url = "http://lysand.localhost:8080"
bind = "http://lysand.localhost"
bind_port = "8080"

# Bans IPv4 or IPv6 IPs (wildcards, networks and ranges are supported)
banned_ips = []
# Banned user agents, regex format
# banned_user_agents = [
# "curl\/7.68.0",
# "wget\/1.20.3",
# ]
[http.bait]
# Enable the bait feature (sends fake data to those who are flagged)
enabled = false
# Path to file of bait data (if not provided, Lysand will send the entire Bee Movie script)
send_file = ""
# IPs to send bait data to (wildcards, networks and ranges are supported)
bait_ips = ["127.0.0.1", "::1"]
bait_user_agents = [
        "curl",
        "wget",
] # User agents to send bait data to (regex format)
```

### Building

Building has been fixed to be able to compile the whole project without issues for a total of a few megabytes of code size. This means you can prebuild the server and run it on a system without needing the `node_modules` folder or any other dependencies.

Docker is still not working due to Bun bugs. I cannot fix this until they do.

## Conclusion

I have made a lot of work on Lysand since my last post, and I feel that the project is getting closer and closer to a full release. I am excited to see where it goes from here, and I hope you are too!

As always, [you can contact me if you have questions or want to chat](/contact).