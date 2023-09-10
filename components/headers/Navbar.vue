<script setup lang="ts">
const products = [
	{
		name: "Mastodon.de Landing",
		description:
			"Beautiful landing page for Mastodon.de, a German Fediverse instance",
		href: "https://join-mastodon.de",
		icon: "tabler:brand-mastodon",
	},
	{
		name: "AIP",
		description:
			"Fully business-ready AI application for conversing with FOSS models",
		href: "https://aip.cpluspatch.dev",
		icon: "tabler:server-bolt",
	},
	{
		name: "CPlusPatch Web",
		description:
			"Complete WYSIWYG CMS ready to be used for websites and blogs",
		href: "https://github.com/CPlusPatch/web-business",
		icon: "tabler:world-www",
	},
	{
		name: "Fedibase",
		description: "Fully featured Fediverse client with lots of features",
		href: "https://github.com/CPlusPatch/fedibase",
		icon: "tabler:browser",
	},
];

const callsToAction = [
	{
		name: "Matrix",
		href: "https://matrix.to/#/@jesse:cpluspatch.dev",
		icon: "tabler:brand-matrix",
	},
	{ name: "Email", href: "contact@cpluspatch.com", icon: "tabler:mail" },
	{
		name: "GitHub",
		href: "https://github.com/CPlusPatch",
		icon: "tabler:brand-github",
	},
];

const { y: scrollY } = useWindowScroll();

const open = ref(false);
</script>
<template>
	<header
		:class="[
			'z-10 bg-transparent backdrop-blur-lg',
			'fixed top-0 inset-x-0',
			scrollY > 100 && 'bg-dark-800/30',
		]">
		<nav
			class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
			<div class="flex lg:flex-1">
				<a href="#" class="-m-1.5 p-1.5">
					<span class="sr-only">CPlusPatch</span>
					<nuxt-img
						class="h-8 w-auto"
						width="229"
						height="229"
						src="/images/icons/logo.svg"
						alt="CPlusPatch Logo" />
				</a>
			</div>
			<div class="flex lg:hidden">
				<button
					type="button"
					class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
					@click="open = true">
					<span class="sr-only">Open main menu</span>
					<Icon
						name="tabler:menu-2"
						class="h-6 w-6"
						aria-hidden="true" />
				</button>
			</div>
			<HeadlessPopoverGroup class="hidden lg:flex lg:gap-x-12">
				<HeadlessPopover>
					<HeadlessPopoverButton
						class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-50">
						Projects
						<Icon
							name="tabler:chevron-down"
							class="h-5 w-5 flex-none text-gray-500"
							aria-hidden="true" />
					</HeadlessPopoverButton>

					<transition
						enter-active-class="transition ease-out duration-200"
						enter-from-class="opacity-0 -translate-y-1"
						enter-to-class="opacity-100 translate-y-0"
						leave-active-class="transition ease-in duration-150"
						leave-from-class="opacity-100 translate-y-0"
						leave-to-class="opacity-0 -translate-y-1">
						<HeadlessPopoverPanel
							class="absolute inset-x-0 top-0 -z-10 bg-dark-700 pt-14 shadow-lg ring-1 ring-dark-900/5">
							<div
								class="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
								<div
									v-for="item in products"
									:key="item.name"
									class="group relative rounded-lg p-6 text-sm leading-6 hover:bg-dark-400 duration-200 ring-dark-200 hover:ring-1">
									<div
										class="flex h-11 w-11 items-center justify-center rounded-lg bg-dark-300 duration-200 group-hover:bg-dark-700">
										<Icon
											:name="item.icon"
											class="h-6 w-6 text-gray-400 group-hover:text-orange-400"
											aria-hidden="true" />
									</div>
									<a
										:href="item.href"
										class="mt-6 block font-semibold text-gray-50">
										{{ item.name }}
										<span class="absolute inset-0" />
									</a>
									<p class="mt-1 text-gray-300">
										{{ item.description }}
									</p>
								</div>
							</div>
							<div class="bg-dark-300">
								<div class="mx-auto max-w-7xl px-6 lg:px-8">
									<div
										class="grid grid-cols-3 divide-x divide-dark-50/5 border-x border-dark-50/5">
										<a
											v-for="item in callsToAction"
											:key="item.name"
											:href="item.href"
											class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-50 hover:bg-dark-400 duration-200">
											<Icon
												:name="item.icon"
												class="h-5 w-5 flex-none text-gray-500"
												aria-hidden="true" />
											{{ item.name }}
										</a>
									</div>
								</div>
							</div>
						</HeadlessPopoverPanel>
					</transition>
				</HeadlessPopover>

				<a href="#" class="text-sm font-semibold leading-6 text-gray-50"
					>Blog</a
				>
				<a href="#" class="text-sm font-semibold leading-6 text-gray-50"
					>Marketplace</a
				>
				<a href="#" class="text-sm font-semibold leading-6 text-gray-50"
					>Contact</a
				>
			</HeadlessPopoverGroup>
			<div class="hidden lg:flex lg:flex-1 lg:justify-end">
				<a
					href="#"
					class="text-sm font-semibold group leading-6 text-gray-50"
					>Log in <ButtonsAnimatedArrow
				/></a>
			</div>
		</nav>
		<HeadlessDialog
			as="div"
			class="lg:hidden"
			:open="open"
			@close="open = false">
			<div class="fixed inset-0 z-10"></div>
			<HeadlessDialogPanel
				class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-dark-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-dark-50/10">
				<div class="flex items-center justify-between">
					<a href="#" class="-m-1.5 p-1.5">
						<span class="sr-only">CPlusPatch</span>
						<nuxt-img
							class="h-8 w-auto"
							width="229"
							height="229"
							src="/images/icons/logo.svg"
							alt="CPlusPatch Logo" />
					</a>
					<button
						type="button"
						class="-m-2.5 rounded-md p-2.5 text-gray-200"
						@click="open = false">
						<span class="sr-only">Close menu</span>
						<Icon
							name="tabler:x"
							class="h-6 w-6"
							aria-hidden="true" />
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-400/10">
						<div class="space-y-2 py-6">
							<HeadlessDisclosure
								v-slot="{ open }"
								as="div"
								class="-mx-3">
								<HeadlessDisclosureButton
									class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500">
									Projects
									<Icon
										name="tabler:chevron-down"
										:class="[
											open ? '-scale-y-100' : '',
											'h-5 w-5 flex-none duration-200',
										]"
										aria-hidden="true" />
								</HeadlessDisclosureButton>
								<HeadlessDisclosurePanel class="mt-2 space-y-2">
									<HeadlessDisclosureButton
										v-for="item in [
											...products,
											...callsToAction,
										]"
										:key="item.name"
										as="a"
										:href="item.href"
										class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-50 hover:bg-dark-300"
										>{{
											item.name
										}}</HeadlessDisclosureButton
									>
								</HeadlessDisclosurePanel>
							</HeadlessDisclosure>
							<a
								href="#"
								class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500"
								>Blog</a
							>
							<a
								href="#"
								class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500"
								>Marketplace</a
							>
							<a
								href="#"
								class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500"
								>Contact</a
							>
						</div>
						<div class="py-6">
							<a
								href="#"
								class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500"
								>Log in</a
							>
						</div>
					</div>
				</div>
			</HeadlessDialogPanel>
		</HeadlessDialog>
	</header>
</template>
