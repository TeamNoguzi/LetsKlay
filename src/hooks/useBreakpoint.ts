import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

// @ts-ignore
import variables from '../_variables.scss';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const resolveBreakpoint = ( width: number ): Breakpoint => {
	if ( width < Number(variables.sm) ) {
		return 'xs';
	} else if ( width >= Number(variables.sm) && width < Number(variables.md) ) {
		return 'sm';
	} else if ( width >= Number(variables.md) && width < Number(variables.lg) ) {
		return 'md';
	} else if ( width >= Number(variables.lg) && width < Number(variables.xl) ) {
		return 'lg';
	} else if ( width >= Number(variables.xl) && width < Number(variables.xxl) ) {
		return 'xl';
	} else if ( width >= Number(variables.xxl) ) {
		return 'xxl';
	}
	else return 'xxl';
};

/** Get Media Query Breakpoints in React */
const useBreakpoint = (): [Breakpoint, (breakpoint:Breakpoint)=>boolean] => {
	const [size, setSize] = useState(()=>resolveBreakpoint(window.innerWidth));
	const callback = useCallback(e => setSize(resolveBreakpoint(e.target.innerWidth)), []);

	const isSize = (breakpoint:Breakpoint) => {
		let ret;
		switch(breakpoint) {
			// @ts-expect-error
			case 'xxl':
				ret = size==='xxl';
			// @ts-expect-error
			case 'xl':
				ret = ret || size==='xl';
			// @ts-expect-error
			case 'lg':
				ret = ret || size==='lg';
			// @ts-expect-error
			case 'md':
				ret = ret || size==='md';
			// @ts-expect-error
			case 'sm':
				ret = ret || size==='sm';
			case 'xs':
				ret = ret || size==='xs';
				break;
		}
		return !ret;
	}

	useEffect(() => {
		const calcInnerWidth = debounce(callback, 200);
		window.addEventListener('resize', calcInnerWidth);
		return () => window.removeEventListener('resize', calcInnerWidth);
	}, [callback]);
	
	return [size, isSize];
};

export default useBreakpoint;