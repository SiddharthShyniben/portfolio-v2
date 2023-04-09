'use strict';

const $ = (...args) => document.querySelector(...args);
const $$ = (...args) => document.querySelectorAll(...args);
const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));
const TAB_TRANSITION = 250;
let transitioning = false;

$$('[data-goto]').forEach(element => {
	element.addEventListener('click', async () => {
		if (element.classList.contains('active')) return;
		if (transitioning) return;
		transitioning = true;
		
		const activeTab = $(`.tab-content.active`);
		const activeButton = $('[data-goto].active')
		activeTab.classList.add('out');
		await sleep(TAB_TRANSITION);
		activeTab.classList.remove('active')
		activeButton.classList.remove('active')
		
		const tabID = element.dataset.goto;
		const tab = $(`[data-tab="${tabID}"]`)
		tab.classList.add('out');
		tab.classList.add('active');
		await sleep(TAB_TRANSITION);
		tab.classList.add('in');
		tab.classList.remove('out');
		await sleep(TAB_TRANSITION);
		tab.classList.remove('in');
		element.classList.add('active');
		transitioning = false;
	})
})
