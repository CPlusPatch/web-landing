<script setup lang="ts">
import { Blend, Container, ListCheck } from "lucide-vue-next";

const principles = [
    {
        icon: Container,
        title: "Build Reproducibility",
        description:
            "I use systems such as Docker or Nix to build and deploy my systems in a way that is reproducible and sandboxed.",
    },
    {
        icon: ListCheck,
        title: "Automatic Linting & Formatting",
        description:
            "My apps are strictly checked for errors whenever I edit code, leading to less bugs and better-looking outputs.",
    },
    {
        icon: Blend,
        title: "Extensibility and Futureproofing",
        description:
            "Apps should be written with scaling up in mind, and this is true of any system. Things should be done in a way that they still make sense later on.",
    },
];
</script>

<template>
	<div class="mt-10 max-w-xl text-base leading-7 lg:max-w-none">
		<p>
			While writing code, I adhere to my own set of principles, which I
			apply as part of my philosophy to achieve excellence. Here are some
			of the things I believe in:
		</p>
		<ul class="mt-8 space-y-6 text-secondary-foreground">
			<li
				v-for="principle in principles"
				:key="principle.title"
				class="flex gap-x-3">
				<component :is="principle.icon"
					class="mt-1 size-5 flex-none text-primary" />
				<span>
					<strong class="font-semibold text-accent-foreground">{{
						principle.title
					}}</strong>
                    &middot;
					{{ principle.description }}
				</span>
			</li>
		</ul>
		<h2 class="mt-16 text-2xl font-bold tracking-tight">
			Security
		</h2>
		<p class="mt-6">
			I am a fervent believer in security and hardening: all my devices
			are protected with full-disk encryption, I follow industry-standard
			security practices and use Linux and open systems with a hardened
			configuration everywhere.
		</p>
	</div>
</template>
