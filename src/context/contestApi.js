import { createContext, useState, useEffect } from 'react';
import { fetchDataFromApi } from '../utils/api';

export const Context = createContext();

export const AppContext = props => {
	const [loading, setLoading] = useState(false);
	const [searchResults, setSearchResults] = useState(false);
	const [selectCotegories, setSelectCotegories] = useState('New');
	const [mobileMenu, setMobileMenu] = useState(false);

	useEffect(() => {
		fetchSelectedCotegoriesData(selectCotegories);
	}, [selectCotegories]);

	const fetchSelectedCotegoriesData = query => {
		setLoading(true);
		fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
			console.log(contents);
			setSearchResults(contents);
			setLoading(false);
		});
	};

	return (
		<Context.Provider
			value={{
				loading,
				setLoading,
				searchResults,
				setSearchResults,
				mobileMenu,
				setMobileMenu,
			}}>
			{props.children}
		</Context.Provider>
	);
};
