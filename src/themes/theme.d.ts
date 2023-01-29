import {
	Palette as MuiPallete,
	PalleteColor as MuiPaletteColor,
	PaletteOptions as MuiPaletteOptions,
	SimplePaletteColorOptions as MuiSimplePaletteColorOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
	interface Palette extends MuiPallete {
		light: { main: string; gradient?: string };
		dark: { main: string; gradient?: string };
	}

	interface PalleteColor extends MuiPaletteColor {
		gradient?: string;
	}

	interface PaletteOptions extends MuiPaletteOptions {
		light?: { main: string; gradient?: string };
		dark?: { main: string; gradient?: string };
		gradient?: string;
	}

	interface SimplePaletteColorOptions extends MuiSimplePaletteColorOptions {
		gradient?: string;
	}
}
