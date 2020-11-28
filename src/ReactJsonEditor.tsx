import React, { useState } from 'react';
import { DisplayEditor } from './DisplayEditor';

export const JsonEditor: React.FC<{ json: any }> = (json: any) => {
	const [curJson, setCurJson] = useState<any>(json);
    const keyFormat = (key: string) => `"${key}"`;
	
	const formatJSON = (json: any, path: any[]): React.ReactNode => {
		const keys = Object.keys(json);
		let nodeArray = [];
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const jsonValue = json[key];
			let curPath = path.concat(key);
			if (Array.isArray(jsonValue)) {
				const arrValue = jsonValue as unknown[];
				let arrNodeArray = [];
				for (let j = 0; j < arrValue.length; j++) {
					let curPath = path.concat(key, j);
					let subArr = arrValue[j];
					arrNodeArray.push(
                        <DisplayEditor json={curJson} path={curPath} type="object">
                            &#123; {formatJSON(subArr, curPath)} &#125; {j < arrValue.length - 1 ? ',' : ''}
                        </DisplayEditor>
					);
				}
				nodeArray.push(
                    <DisplayEditor json={curJson} path={curPath} type="array">
                        [-] {keyFormat(key)}: [ {arrNodeArray} ]
                    </DisplayEditor>
				);
			} else {
				switch (typeof jsonValue) {
					case 'string':
						nodeArray.push(
                            <DisplayEditor json={curJson} path={curPath} type="string">
                                {keyFormat(key)}: <span className="json-editor-string">"{jsonValue}"</span> {i < keys.length - 1 ? ',' : ''}
                            </DisplayEditor>
						);
						break;
					case 'number':
						nodeArray.push(
                            <DisplayEditor json={curJson} path={curPath} type="number">
								{keyFormat(key)}: <span className="json-editor-number">{jsonValue}</span> {i < keys.length - 1 ? ',' : ''}
							</DisplayEditor>
						);
						break;
					case 'boolean':
                        const boolDisplay = (jsonValue: boolean) => <span className={`json-editor-bool-${jsonValue}`}>{jsonValue.toString()}</span>
						nodeArray.push(
                            <DisplayEditor json={curJson} path={curPath} type="boolean">
								{keyFormat(key)}: {boolDisplay(jsonValue)} {i < keys.length - 1 ? ',' : ''}
							</DisplayEditor>
						);
						break;
					default:
						nodeArray.push(
                            <DisplayEditor json={curJson} path={curPath} type="object">
                                {keyFormat(key)}: &#123; {formatJSON(jsonValue, curPath)} &#125;{' '}
								{i < keys.length - 1 ? ',' : ''}
                            </DisplayEditor>
						);
						break;
				}
			}
		}
		return nodeArray;
	};

	return <div className={'json-editor'}>
        {curJson && formatJSON(curJson, [])}
    </div>;
};
