import React from 'react';
interface IDisplayEditorProps { 
	json: any, 
	path: any[], 
	type: string, 
	children: React.ReactNode, 
	className?: string 
}
export const DisplayEditor: React.FC<IDisplayEditorProps> = (props: IDisplayEditorProps) => {
	const handleDivClick = (event: React.MouseEvent, path: any[]) => {
		event.preventDefault();
		event.stopPropagation();
		let curKeyValue = props.json;
		for (var i = 0; i < path.length - 1; i++) {
			let level = path[i];
			curKeyValue = curKeyValue[level];
		}
		let lastPath = path[path.length - 1];
		console.log({ lastPath, value: curKeyValue[lastPath] });
	};

	return (
		<div
			onClick={(event: React.MouseEvent) => handleDivClick(event, props.path)}
			className={props.className}
		>
			{props.children}
		</div>
	);
};
