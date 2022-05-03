import { allOption } from "./MultiSelectDropdown";

const CreateGroup = (groupName, options, setValue, groupId, value, numOfOptions) => {
	return {
		label: (() => {
			return (
				<div
					onClick={() => {
						const containsAll = options.every(element => {
							return value.includes(element);
						});
						if (containsAll) {
							setValue(value =>
								value.filter(opt => !options.includes(opt))
							);
							setValue(value =>
								value.filter(opt => !(opt.label === "Select all"))
							);
						} else {
							let curSelectedNum = options.filter(opt => value.includes(opt)).length;
							let added = options.length - curSelectedNum;
							setValue(value =>
								value.concat(options.filter(grpOpt => !value.includes(grpOpt)))
							);
							if (numOfOptions <= value.length + added) {
								setValue(value =>
									[allOption, ...value]
								);
							}
						}
					}
					}
				>
					{groupName}
				</div>
			);
		})(),
		value: groupId,
		options: options
	};
}

export default CreateGroup;