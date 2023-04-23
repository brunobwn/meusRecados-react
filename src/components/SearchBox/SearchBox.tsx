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
import api from '../../service/ApiService';
import { setMessages } from '../../app/reducers/messagesSlice';
import { useAppDispatch } from '../../app/hooks';
import { useState } from 'react';

const SearchBox = () => {
	const dispatch = useAppDispatch();
	const [statusSearch, setStatusSearch] = useState<number>(1);
	const [searchText, setSearchText] = useState<string>('');
	
	function handleResetSearch() {
		setStatusSearch(1);
		setSearchText('');
		handleSearch();
	}

	async function handleSearch() {
		let active;
		switch (statusSearch) {
			case 1:
				active = true;
				break;
			case 2:
				active = false;
				break;
			default:
				active = null;
				break;
		}
		api
			.getFiltredMessages({ search: searchText, active })
			.then((res) => res.data)
			.then((data) => {
				dispatch(setMessages(Object.values(data)));
			})
			.catch(({ response }) => {
				// console.log(response);
			});
	}
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
				onChange={(e) => setSearchText(e.target.value)}
				value={searchText}
			/>
			{/* <TextField
				type="date"
				color="secondary"
				size="small"
				label="Até a data"
				id="searchDateMessage"
				focused
			/> */}
			<FormControl color="secondary" sx={{ minWidth: ['100%', 200] }} focused>
				<InputLabel id="searchStatusMessage-label">Status</InputLabel>
				<Select
					labelId="searchStatusMessage-label"
					id="searchStatusMessage"
					label="Status"
					color="secondary"
					size="small"
					onChange={(e) => setStatusSearch(Number(e.target.value))}
					value={statusSearch}
				>
					<MenuItem value={0}>Todos</MenuItem>
					<MenuItem value={1}>Ativo</MenuItem>
					<MenuItem value={2}>Arquivado</MenuItem>
				</Select>
			</FormControl>
			<Button color="secondary" variant="outlined" sx={{ flexGrow: 0.5 }} onClick={handleResetSearch}>
				Limpar filtros
			</Button>
			<Button color="secondary" variant="contained" sx={{ flexGrow: 0.5 }} onClick={handleSearch}>
				Buscar
			</Button>
		</Stack>
	);
};

export default SearchBox;
