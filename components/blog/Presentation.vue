<script setup lang="ts">
const { locale } = useI18n();

const posts = await queryContent("/").locale(locale.value.split("-")[0]).find();
</script>

<template>
	<div v-if="posts.length > 0" class="px-4 md:px-6 py-24 mx-auto max-w-7xl">
		<div class="mx-auto max-w-2xl text-center">
			<h2
				class="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
				From The Blog
			</h2>
		</div>
		<div
			class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
			<article v-for="post in posts" :key="post._id">
				<a
					class="flex flex-col items-start justify-between"
					:href="`/blog/${locale.split('-')[0]}${post._path}`">
					<div class="relative w-full">
						<img
							:src="post.image ?? ''"
							alt=""
							class="aspect-[16/9] w-full rounded-2xl bg-dark-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
						<div
							class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-100/10" />
					</div>
					<div class="max-w-xl">
						<div class="mt-8 flex items-center gap-x-4 text-xs">
							<time
								:datetime="post.created_at ?? 0"
								class="text-gray-500"
								>{{
									Intl.DateTimeFormat("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									}).format(new Date(post.created_at ?? 0))
								}}</time
							>
						</div>
						<div class="group relative">
							<h3
								class="mt-3 text-lg font-semibold leading-6 text-gray-50 group-hover:text-gray-300">
								<a :href="post.href">
									<span class="absolute inset-0" />
									{{ post.title ?? "" }}
								</a>
							</h3>
							<p
								class="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">
								{{ post.description ?? "" }}
							</p>
						</div>
						<div class="relative mt-8 flex items-center gap-x-4">
							<img
								:src="post.author_image ?? ''"
								alt=""
								class="h-10 w-10 rounded-full bg-dark-100" />
							<div class="text-sm leading-6">
								<p class="font-semibold text-gray-50">
									<a href="#">
										<span class="absolute inset-0" />
										{{ post.author ?? "" }}
									</a>
								</p>
								<p class="text-gray-300">
									{{ post.author_handle ?? "" }}
								</p>
							</div>
						</div>
					</div>
				</a>
			</article>
		</div>
	</div>
</template>
