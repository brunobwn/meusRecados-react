import {
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const SearchBox = () => {
	return (
		<Stack
			direction={{ sm: 'column', md: 'row' }}
			spacing={2}
			sx={{ backgroundColor: 'white', borderRadius: 2, p: 2, mt: 2 }}
		>
			<TextField
				color="secondary"
				size="small"
				label="Buscar nos recados"
				id="searchStringMessage"
				focused
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<SearchIcon />
						</InputAdornment>
					),
				}}
				sx={{ flexGrow: 1 }}
			/>
			<TextField
				type="date"
				color="secondary"
				size="small"
				label="Até a data"
				id="searchDateMessage"
				focused
			/>
			<FormControl color="secondary" sx={{ minWidth: ['100%', 200] }} focused>
				<InputLabel id="searchStatusMessage-label">Status</InputLabel>
				<Select
					labelId="searchStatusMessage-label"
					id="searchStatusMessage"
					value={10}
					label="Status"
					color="secondary"
					size="small"
				>
					<MenuItem value={10}>Todos</MenuItem>
					<MenuItem value={20}>Completado</MenuItem>
					<MenuItem value={30}>Em andamento</MenuItem>
				</Select>
			</FormControl>
			<Button color="secondary" variant="contained" sx={{ flexGrow: 0.5 }}>
				Buscar
			</Button>
		</Stack>
	);
};

export default SearchBox;
