window.addEventListener('load', () => {
	const $splash = $('#splash');
	const $splashLogo = $('#splash-logo');
	const $splashBg = $('.splashbg');
	const $body = $('body');

	$splash.delay(1500).fadeOut('slow', () => {
		// ローディングエリアを1.5秒でフェードアウト
		$body.addClass('appear'); // フェードアウト後bodyにappearクラス付与
		const h = $(window).height(); // ブラウザの高さを取得
		$splashBg.css({
			'border-width': h, // ボーダーの太さにブラウザの高さを代入
			'animation-name': 'backBoxAnime', // animation-nameを定義
		});
	});

	$splashLogo.delay(1200).fadeOut('slow'); // ロゴを1.2秒でフェードアウト
	$body.removeClass('fadeout');
});

// ハッシュリンクおよびページ遷移
document.addEventListener('DOMContentLoaded', () => {
	document
		.querySelectorAll('a:not([href^="#"]):not([target])')
		.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const url = link.getAttribute('href');
				if (url) {
					document.body.classList.add('fadeout');
					setTimeout(() => {
						window.location.href = url;
					}, 800);
				}
			});
		});

	// ページトップへ戻る
	const pageTop = document.querySelector('.page-top');

	// 初期状態で非表示の設定
	pageTop.style.opacity = '0';
	pageTop.style.visibility = 'hidden';
	pageTop.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';

	window.addEventListener('scroll', () => {
		if (window.scrollY > 300) {
			pageTop.style.opacity = '1';
			pageTop.style.visibility = 'visible';
		} else {
			pageTop.style.opacity = '0';
			pageTop.style.visibility = 'hidden';
		}
	});

	pageTop.addEventListener('click', (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	// ハンバーガーメニュー
	const btnMenu = document.getElementById('js-btn-menu');
	const gnav = document.querySelector('.gnav');
	btnMenu.addEventListener('click', () => {
		btnMenu.classList.toggle('open');
		gnav.classList.toggle('open');
	});
});

//slickだけはjQuery使った
$(() => {
	// pickupスライダー
	$('.slick-area').slick({
		arrows: true,
		centerMode: true,
		centerPadding: '100px',
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					centerPadding: '50px',
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					centerPadding: '30px',
					slidesToShow: 1,
				},
			},
		],
		prevArrow:
			'<span class="btn-prev material-icons-round">chevron_left</span>',
		nextArrow:
			'<span class="btn-next material-icons-round">chevron_right</span>',
	});
});

// スクロール時に要素がフェードイン
const animateFade = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.animate(
				[
					{
						opacity: 0,
						filter: 'blur(0.4rem)',
						transform: 'translateY(4rem)',
					},
					{
						opacity: 1,
						filter: 'blur(0)',
						transform: 'translateY(0)',
					},
				],
				{
					duration: 1500,
					easing: 'ease',
					fill: 'forwards',
				}
			);
			observer.unobserve(entry.target);
		}
	});
};

// 交差判定オプション
const fadeObserver = new IntersectionObserver(animateFade, { threshold: 0.6 });

// 監視対象の要素に対する処理
document.querySelectorAll('.fadein').forEach((fadeElement) => {
	fadeObserver.observe(fadeElement);
});
