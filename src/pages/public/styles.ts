export const BoxWrapperCss = {
	display: 'grid',
	placeItems: 'center',
	minHeight: '100vh',
	paddingX: 1,
	paddingTop: 6,
	paddingBottom: 3,
};

export const ContainerFormCss = {
	background: 'white',
	borderRadius: 2,
	padding: 3,
	boxShadow: 5,
};

export const HeaderFormCss = {
	borderRadius: 2,
	padding: 2,
	marginTop: -6,
	marginBottom: 4,
	background: (theme: Theme) => theme.palette.primary.main,
	color: 'white',
	boxShadow: 2,
};
