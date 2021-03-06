import {
	APPLY_STYLE,
	CHANGE_DATE,
	CHANGE_STYLES,
	CHANGE_TEXT,
	CHANGE_TITLE,
	TABLE_RESIZE,
} from './types';

export function rootReducer(state, action) {
	let field;
	let value;

	switch (action.type) {
		case TABLE_RESIZE:
			field = action.payload.type === 'col' ? 'colState' : 'rowState';
			return {
				...state,
				[field]: { ...state[field], ...action.payload.size },
			};
		case CHANGE_TEXT:
			return {
				...state,
				currentText: action.payload.text,
				dataState: {
					...state.dataState,
					...(action.payload.text && {
						[action.payload.id]: action.payload.text,
					}),
				},
			};
		case CHANGE_STYLES:
			return {
				...state,
				currentStyles: {
					...state.currentStyles,
					...action.payload,
				},
			};
		case APPLY_STYLE:
			value = state.stylesState || {};
			action.payload.ids.forEach(id => {
				value[id] = {
					...state.stylesState[id],
					...action.payload.value,
				};
			});

			return {
				...state,
				stylesState: {
					...state.stylesState,
					...value,
				},
			};
		case CHANGE_TITLE:
			return { ...state, title: action.payload };
		case CHANGE_DATE:
			return { ...state, date: new Date().toJSON() };
		default:
			return state;
	}
}
