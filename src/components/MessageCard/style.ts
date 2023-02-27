export const ContainerCardCSS = {
	gridTemplateRows: 'masonry',
};
const cardMinHeight = '15rem';
export const ContentCardCSS = {
	background: '#fff',
	borderRadius: 2,
	padding: 1,
	aspectRatio: '1/1',
	display: 'flex',
	flexDirection: 'column',
	overflowY: 'auto',
};

export const newContentCardCSS = {
	border: '5px dashed rgba(255,255,255,0.3)',
	borderRadius: 3,
	padding: 1,
	aspectRatio: '1/1',
	display: 'grid',
	placeItems: 'center',
	cursor: 'pointer',
	'&:hover': {
		borderColor: 'rgba(255,255,255,0.8)',
		'& svg': {
			transform: 'scale(1.2)',
		},
	},
	transition: 'all ease 300ms',
};
