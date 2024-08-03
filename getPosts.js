/**
 * @typedef {{author: {name: string; href: string};title: string; body: string; timeCreated: Date}} Post
 * @type {Post[]}
 */
const posts = [
	{
		author: { name: 'Hatzilu', href: 'https://github.com/Hatzilu' },
		title: 'Post 1',
		body: '<p>content</p>',
		timeCreated: new Date(Date.now()),
	},
	{
		author: { name: 'Hatzilu', href: 'https://github.com/Hatzilu' },
		title: 'Post 2',
		body: '<p>content</p>',
		timeCreated: new Date(Date.now()),
	},
	{
		author: { name: 'Hatzilu', href: 'https://github.com/Hatzilu' },
		title: 'Post 3',
		body: '<p>content</p>',
		timeCreated: new Date(Date.now()),
	},
];

async function getPosts() {
	/**
	 * @type {Post[]}
	 */
	const postsRes = await new Promise((res, reject) => setTimeout(() => res(posts), 1000));

	const postsContainer = document.getElementById('posts');
	/**
	 * @type {HTMLTemplateElement | null}
	 */
	const template = document.getElementById('blogPostTemplate');

	if (!postsContainer || !template) {
		return;
	}
	postsRes.forEach((post) => {
		console.log({ post });
		/**
		 * @type {HTMLTemplateElement | null}
		 */
		const postTemplateClone = template.content.cloneNode(true);
		if (!postTemplateClone) return;
		/**
		 * @type {HTMLTimeElement | null}
		 */
		const time = postTemplateClone.querySelector('#createdTime');
		if (!time) return;

		time.innerHTML = post.timeCreated.toDateString();
		time.dateTime = post.timeCreated.toISOString();

		/**
		 * @type {HTMLAnchorElement | null}
		 */
		const author = postTemplateClone.querySelector('#author');
		if (!author) return;

		author.innerHTML = post.author.name;
		author.href = post.author.href;
		const contentElement = postTemplateClone.querySelector('#content');
		if (!contentElement) return;

		contentElement.innerHTML = post.body;

		const titleElement = postTemplateClone.querySelector('#title');
		if (!titleElement) return;

		titleElement.innerHTML = post.title;

		postsContainer.appendChild(postTemplateClone);
	});
	document.getElementById('loading')?.remove();
}

getPosts();
